"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Cursor from "./Cursor";
import Typewriter from "./Typewriter";

export default function Terminal() {
  const [value, setValue] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [showDecrypt, setShowDecrypt] = useState(false);
  const [showAccess, setShowAccess] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showBack, setShowBack] = useState(false);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key !== "Enter") return;

    if (value.trim().toLowerCase() === "yes") {
      setAccepted(true);
    } else {
      setValue("");
    }
  }

  useEffect(() => {
    if (!accepted) return;

    const t1 = setTimeout(() => setShowDecrypt(true), 250);
    const t2 = setTimeout(() => setShowAccess(true), 1200);
    const t3 = setTimeout(() => setShowEmail(true), 1700);
    const t4 = setTimeout(() => setShowPhone(true), 3200);
    const t5 = setTimeout(() => setShowBack(true), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [accepted]);

  return (
    <main className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-[520px] max-w-[90vw] font-mono text-white">
        <p className="mb-8 text-neutral-300">
          Confirm contact request.
        </p>

        <div className="flex items-center">
          <span className="mr-3 text-neutral-500">{">"}</span>

          <input
            autoFocus
            value={value}
            disabled={accepted}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            className="
              flex-1
              bg-transparent
              outline-none
              text-white
              caret-transparent
            "
          />

          {!accepted && <Cursor />}
        </div>

        {accepted && (
          <div className="mt-8 text-neutral-200 space-y-2">
            <p>Accepted.</p>

            {showDecrypt && (
              <p className="text-neutral-400">
                Decrypting contact...
              </p>
            )}

            {showAccess && (
              <div className="pt-4">
                <Typewriter
                  text="✓ Access granted"
                />
              </div>
            )}

            {showEmail && (
              <Typewriter
                text="Email: contact.filetmon@gmail.com"
              />
            )}

            {showPhone && (
              <Typewriter
                text="Phone: +33 6 73 24 16 22"
              />
            )}
          </div>
        )}
      </div>

      {showBack && (
        <Link
          href="/"
          className="
            fixed
            bottom-8
            right-8
            text-sm
            text-neutral-500
            hover:text-white
            transition-all
            duration-300
          "
        >
          Back
        </Link>
      )}
    </main>
  );
}
