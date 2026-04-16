"use client";

import { useEffect, useState } from "react";

const EXPECTED_EID_DATE = new Date("2026-05-27T00:00:00");

type CountdownState = {
  title: string;
  detail: string;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getCountdownState(): CountdownState {
  const today = startOfDay(new Date());
  const target = startOfDay(EXPECTED_EID_DATE);
  const msRemaining = target.getTime() - today.getTime();
  const daysRemaining = Math.round(msRemaining / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return {
      title: "The days of Hajj have arrived",
      detail: "These blessed days are here.",
    };
  }

  if (daysRemaining === 0) {
    return {
      title: "Expected Eid al-Adha is here",
      detail: "These blessed days are here.",
    };
  }

  if (daysRemaining === 1) {
    return {
      title: "1 day until Eid al-Adha",
      detail: "A quiet countdown for the days ahead.",
    };
  }

  return {
    title: `${daysRemaining} days until Eid al-Adha`,
    detail: "A quiet countdown for the days ahead.",
  };
}

function getMillisecondsUntilNextMidnight() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return nextMidnight.getTime() - now.getTime();
}

export function HajjCountdown() {
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdownState());

  useEffect(() => {
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      setCountdown(getCountdownState());
      intervalId = window.setInterval(() => {
        setCountdown(getCountdownState());
      }, 1000 * 60 * 60 * 24);
    }, getMillisecondsUntilNextMidnight());

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sage-deep)]">
        {countdown.title}
      </p>
      <p className="text-sm leading-6 text-[var(--muted-foreground)]">{countdown.detail}</p>
    </div>
  );
}
