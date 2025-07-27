"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ScrambleTextProps {
  content: string;
  delay?: number;
  className?: string;
}

type Char = {
  char: string;
  placeholder?: string;
};

const SCRAMBLE_SPEED = 100; // Increased from 70ms to reduce frequency
const SCRAMBLE_CHARS = "!<>\\/[]{}@=+*^?#________".split("");

export function ScrambleText(props: ScrambleTextProps) {
  const [chars, setChars] = useState<Char[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isMountedRef = useRef(true);

  const getRandomChar = useCallback((): string => {
    return (
      SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? "_"
    );
  }, []);

  const initChars = useCallback(
    (content: string) => {
      return content.split("").map<Char>((char) => ({
        char,
        placeholder: getRandomChar(),
      }));
    },
    [getRandomChar],
  );

  const wait = useCallback((ms: number): Promise<void> => {
    return new Promise((resolve) => {
      if (!isMountedRef.current) {
        resolve();
        return;
      }
      timeoutRef.current = setTimeout(resolve, ms);
    });
  }, []);

  const animateScramble = useCallback(async () => {
    if (!isMountedRef.current) return;

    // Initial delay
    if (props.delay) {
      await wait(props.delay);
    }

    if (!isMountedRef.current) return;

    // Initialize with scrambled characters
    const initialChars = initChars(props.content);
    setChars(initialChars);

    // Reduced initial scrambling phase from 5 to 3 iterations
    for (let i = 0; i < 3; i++) {
      if (!isMountedRef.current) return;

      // Use setTimeout instead of RAF for less frequent updates
      setChars((current) =>
        current.map((char) => ({
          ...char,
          placeholder: char.placeholder ? getRandomChar() : undefined,
        })),
      );

      await wait(SCRAMBLE_SPEED);
    }

    // Revealing phase - simplified
    const keysToReveal = props.content.split("").map((_, index) => index);

    while (keysToReveal.length > 0 && isMountedRef.current) {
      // Reduced scramble iterations from 4 to 2
      for (let i = 0; i < 2; i++) {
        if (!isMountedRef.current) return;

        setChars((current) =>
          current.map((char) => ({
            ...char,
            placeholder: char.placeholder ? getRandomChar() : undefined,
          })),
        );

        await wait(SCRAMBLE_SPEED);
      }

      // Reveal characters in larger batches for faster completion
      const batchSize = Math.min(
        Math.max(2, Math.ceil(keysToReveal.length / 3)), // Larger batches
        keysToReveal.length,
      );
      const keysToRevealNow = new Set<number>();

      for (let i = 0; i < batchSize; i++) {
        const randomIndex = Math.floor(Math.random() * keysToReveal.length);
        const keyToReveal = keysToReveal.splice(randomIndex, 1)[0];
        if (keyToReveal !== undefined) {
          keysToRevealNow.add(keyToReveal);
        }
      }

      if (!isMountedRef.current) return;

      // Batch the reveal update
      setChars((current) =>
        current.map((char, index) => {
          if (!keysToRevealNow.has(index)) return char;
          return { ...char, placeholder: undefined };
        }),
      );
    }
  }, [props.content, props.delay, initChars, getRandomChar, wait]);

  useEffect(() => {
    isMountedRef.current = true;
    void animateScramble();

    return () => {
      isMountedRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [animateScramble]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
