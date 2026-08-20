"use client";

import { useEffect, useRef, useState } from "react";

type StepTransitionProps = {
  step: number;
  direction: "forward" | "backward";
  children: React.ReactNode;
};

const transitionMs = 680;

export default function StepTransition({ step, direction, children }: StepTransitionProps) {
  const previousStepRef = useRef(step);
  const timeoutRef = useRef<number | null>(null);
  const [transition, setTransition] = useState({
    previousStep: step,
    direction,
    active: false,
  });

  useEffect(() => {
    if (previousStepRef.current === step) return;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setTransition({
      previousStep: previousStepRef.current,
      direction,
      active: true,
    });
    previousStepRef.current = step;

    timeoutRef.current = window.setTimeout(() => {
      setTransition((current) => ({ ...current, previousStep: step, active: false }));
      timeoutRef.current = null;
    }, transitionMs);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [direction, step]);

  return (
    <div
      className="step-transition"
      data-current-step={step}
      data-previous-step={transition.previousStep}
      data-direction={transition.direction}
      data-transitioning={transition.active ? "true" : "false"}
    >
      {children}
      <span className="step-transition-wipe" aria-hidden="true" />
    </div>
  );
}
