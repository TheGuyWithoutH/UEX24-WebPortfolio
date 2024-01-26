"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const triggerAnimation = () => {
  const elements = Array.from(document.querySelectorAll("div"));

  for (const element of elements) {
    element.classList.add("glitch-effect");

    // Remove the animation class after the animation duration
    setTimeout(() => {
      element.classList.remove("glitch-effect");
    }, 2000); // Adjust the timeout to match your animation duration
  }
};

export default function GlitchEffect() {
  const [interval, setIntervalValue] = useState(2 ** 17);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      console.log("triggering animation");
      triggerAnimation();
      setIntervalValue((interval) => {
        if (interval > 2000) {
          return interval / 2;
        } else {
          return interval - 1;
        }
      });
    }, interval); // 10000 milliseconds = 10 seconds
  }, [interval]); // Empty dependency array to run the effect once on mount

  useEffect(() => {
    setTimeout(() => {
      router.replace("/end");
    }, 2 ** 18);
  }, []);

  return <></>;
}
