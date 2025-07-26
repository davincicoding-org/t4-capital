"use client";

import { useEffect, useState } from "react";

export interface ScrambleTextProps {
  content: string;
  delay?: number;
  className?: string;
}

type Char = {
  char: string;
  placeholder?: string;
};

const SCRAMBLE_SPEED = 70;
const SCRAMBLE_CHARS = "!<>\\/[]{}@=+*^?#________".split("");

export function ScrambleText(props: ScrambleTextProps) {
  const [chars, setChars] = useState<Char[]>([]);

  const initChars = (content: string) =>
    setChars(() =>
      content.split("").map<Char>((char) => ({
        char,
        placeholder: getRandomChar(),
      })),
    );

  const scrambleChars = () =>
    setChars((current) =>
      current.map((char) => {
        if (!char.placeholder) return char;
        return { ...char, placeholder: getRandomChar() };
      }),
    );

  const revealChars = (keys: Set<number>) =>
    setChars((current) =>
      current.map((char, index) => {
        if (!keys.has(index)) return char;
        return {
          ...char,
          placeholder: undefined,
        };
      }),
    );

  useEffect(() => {
    void (async () => {
      if (props.delay) await wait(props.delay);
      initChars(props.content);
      for (let iterations = 5; iterations > 0; iterations--) {
        scrambleChars();
        await wait(SCRAMBLE_SPEED);
      }

      const keysToReveal = props.content.split("").map((_, index) => index);

      while (keysToReveal.length > 0) {
        for (let i = 0; i < 4; i++) {
          scrambleChars();
          await wait(SCRAMBLE_SPEED);
        }

        const nextKeys = new Set<number>();
        for (
          let iterations = (keysToReveal.length % 2) + 1;
          iterations > 0;
          iterations--
        ) {
          const keyToReveal = getRandomItem(keysToReveal);
          if (keyToReveal === undefined) continue;
          keysToReveal.splice(keyToReveal.index, 1);
          nextKeys.add(keyToReveal.item);
        }

        revealChars(nextKeys);
      }
    })();
  }, [props.delay, props.content]);

  return (
    <span className={props.className}>
      {chars.map(({ char, placeholder }, index) => (
        <span className={placeholder ? "opacity-30" : undefined} key={index}>
          {placeholder ?? char}
        </span>
      ))}
    </span>
  );
}

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

function getRandomItem<G>(
  arrOrSet: Array<G> | Set<G>,
): { item: G; index: number } | undefined {
  const values = Array.isArray(arrOrSet) ? arrOrSet : Array.from(arrOrSet);
  const randomIndex = Math.floor(Math.random() * values.length);
  const item = values[randomIndex];
  if (item === undefined) return undefined;
  return { item, index: randomIndex };
}

const getRandomChar = (): string => getRandomItem(SCRAMBLE_CHARS)?.item ?? "_";
