"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  delay?: number;
};

export default function Typewriter({
  text,
  delay = 0,
}: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const start = setTimeout(() => {
      let index = 0;

      const interval = setInterval(() => {
        index++;

        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 28);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(start);
  }, [text, delay]);

  return (
    <p className="leading-relaxed whitespace-pre-wrap">
      {displayed}
    </p>
  );
}
