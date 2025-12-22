"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const KeyboardKey = ({
  children,
  className,
  trigger,
}: {
  children: React.ReactNode;
  className?: string;
  trigger: string;
}) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const keyToMatch = trigger.toLowerCase();
    if (!keyToMatch) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === keyToMatch) {
        setIsPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === keyToMatch) {
        setIsPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [trigger]);

  return (
    <div
      className={cn(
        "border-black uppercase border border-b-[3px] flex items-center justify-center px-1 font-sans text-sm min-w-[20px] transition-all duration-100 select-none",
        isPressed
          ? "bg-black text-white shadow-none translate-x-[1.5px] -translate-y-[1.5px]"
          : "bg-white shadow-[1.5px_-1.5px_0px_#acacb4]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const KeyboardLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex gap-2", className)}>{children}</div>;
};

export const KeyboardLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("font-departure text-sm mt-1.5", className)}>
      {children}
    </div>
  );
};
