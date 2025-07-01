import { useEffect, useState } from "react";

export interface ScrambleTextProps {
  content: string;
  delay?: number;
  className?: string;
}

export function ScrambleText({ content, delay, className }: ScrambleTextProps) {
  const [chars, setChars] = useState<
    Array<{
      key: string;
      char: string;
      placeholder?: string;
    }>
  >([]);

  const initChars = () =>
    setChars(
      content.split("").map((char, index) => ({
        key: content.substring(0, index + 1),
        char,
        placeholder: getRandomChar(),
      })),
    );
  const scrambleChars = () =>
    setChars((current) =>
      current.map((item) => {
        if (item.placeholder)
          return {
            ...item,
            placeholder: getRandomChar(),
          };
        return item;
      }),
    );

  const revealChars = (indexes: Array<number>) =>
    setChars((current) =>
      current.map((item, index) => {
        if (!indexes.includes(index)) return item;
        return {
          ...item,
          placeholder: undefined,
        };
      }),
    );

  useEffect(() => {
    void (async () => {
      if (delay) await wait(delay);
      initChars();
      for (let iterations = 5; iterations > 0; iterations--) {
        scrambleChars();
        await wait(70);
      }

      let indexesToReveal = content.split("").map((_, index) => index);

      while (indexesToReveal.length > 0) {
        for (let i = 0; i < 4; i++) {
          scrambleChars();
          await wait(70);
        }

        const nextIndexes: Array<number> = [];
        for (
          let iterations = (indexesToReveal.length % 2) + 1;
          iterations > 0;
          iterations--
        ) {
          const indexToReveal = getRandomItem(indexesToReveal);
          indexesToReveal = indexesToReveal.filter((i) => i !== indexToReveal);
          nextIndexes.push(indexToReveal);
        }

        revealChars(nextIndexes);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, content]);

  return (
    <span className={className}>
      {chars.map(({ char, placeholder, key }) => (
        <span
          style={{
            opacity: placeholder ? 0.3 : undefined,
            transition: "all 300ms",
          }}
          key={key}
        >
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

function getRandomItem<G>(arr: Array<G>): G {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex]!;
}

const getRandomChar = (): string =>
  getRandomItem("!<>-_\\/[]{}—=+*^?#________".split(""));
