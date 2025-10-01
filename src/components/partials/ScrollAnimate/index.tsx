"use client";

import React, { ReactNode, useRef, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";

interface ScrollRevealProps {
  direction?: "left" | "right" | "top" | "bottom";
  distance?: number;
  children: ReactNode;
  className?: string;
  rangeForDistance?: any;
  progressRange?: [number, number];
  reverse?: boolean;
  speed?: "fast" | "normal" | "slow" | number;
  mobileConfig?: Partial<{
    direction: "left" | "right" | "top" | "bottom";
    distance: number;
    className: string;
    rangeForDistance: any;
    progressRange: [number, number];
    reverse: boolean;
    speed: "fast" | "normal" | "slow" | number;
    opacityFrom: number;
    opacityTo: number;
    progressDelay: number;
  }>;
  opacityFrom?: number;
  opacityTo?: number;
  progressDelay?: number;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);

export function ScrollReveal({
  direction = "bottom",
  distance = 120,
  children,
  className,
  reverse = false,
  progressRange,
  speed = "normal",
  rangeForDistance = "60%",
  mobileConfig,
  opacityFrom = 0,
  opacityTo = 1,
  progressDelay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const exitProgress: MotionValue<number> = useMotionValue(0);

  const speedPresets = {
    fast: { exit: 160, range: [0, 0.2] as [number, number] },
    normal: { exit: 300, range: [0, 0.5] as [number, number] },
    slow: { exit: 500, range: [0, 1] as [number, number] },
  };

  const resolvedProgressRange =
    progressRange ??
    (typeof speed === "number"
      ? [0, clamp(speed / 100, 0, 1)]
      : speedPresets[speed].range);

  const { width } = useWindowSize();
  const isMobile = width ? width < 1024 : true;

  const effective = useMemo(() => {
    if (isMobile && mobileConfig) {
      return {
        direction: mobileConfig.direction ?? direction,
        distance: mobileConfig.distance ?? distance,
        className: mobileConfig.className ?? className,
        reverse: mobileConfig.reverse ?? reverse,
        progressRange: mobileConfig.progressRange ?? resolvedProgressRange,
        speed: mobileConfig.speed ?? speed,
        rangeForDistance: mobileConfig.rangeForDistance ?? rangeForDistance,
        opacityFrom: mobileConfig.opacityFrom ?? opacityFrom,
        opacityTo: mobileConfig.opacityTo ?? opacityTo,
        progressDelay: mobileConfig.progressDelay ?? progressDelay,
      };
    }

    return {
      direction,
      distance,
      className,
      reverse,
      progressRange: resolvedProgressRange,
      speed,
      rangeForDistance,
      opacityFrom,
      opacityTo,
      progressDelay,
    };
  }, [
    isMobile,
    mobileConfig,
    direction,
    distance,
    className,
    reverse,
    resolvedProgressRange,
    speed,
    rangeForDistance,
    opacityFrom,
    opacityTo,
    progressDelay,
  ]);

  useEffect(() => {
    if (!effective.reverse) return;

    let running = false;
    const onScroll = () => {
      if (running) return;
      running = true;
      requestAnimationFrame(() => {
        const exitDist =
          typeof effective.speed === "number"
            ? effective.speed
            : speedPresets[effective.speed as "fast" | "normal" | "slow"].exit;
        const t = clamp((window.scrollY || 0) / Math.max(1, exitDist), 0, 1);
        exitProgress.set(t);
        running = false;
      });
    };

    exitProgress.set(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [effective.reverse, effective.speed, exitProgress]);

  const [xFrom, yFrom] = (() => {
    switch (effective.direction) {
      case "left":
        return [-effective.distance, 0];
      case "right":
        return [effective.distance, 0];
      case "top":
        return [0, -effective.distance];
      case "bottom":
      default:
        return [0, effective.distance];
    }
  })();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `center ${effective.rangeForDistance}`],
  });

  const sourceProgress = effective.reverse ? exitProgress : scrollYProgress;

  const basePR = effective.progressRange ?? [0, 1];
  const delayedPR = (() => {
    const d = effective.progressDelay ?? 0;
    if (!d) return basePR;
    const s0 = clamp((basePR[0] ?? 0) + d, 0, 1);
    const s1 = clamp((basePR[1] ?? 1) + d, 0, 1);
    return s0 < s1 ? [s0, s1] : [s1, s0];
  })();

  const pr0 = clamp(delayedPR[0] ?? 0, 0, 1);
  const pr1 = clamp(delayedPR[1] ?? 1, 0, 1);
  const inputRange: [number, number] = pr0 < pr1 ? [pr0, pr1] : [pr1, pr0];

  const mapToLocal = useTransform(
    sourceProgress as MotionValue<number>,
    [inputRange[0], inputRange[1]],
    [0, 1],
    { clamp: true }
  );

  const x = useTransform(
    mapToLocal,
    [0, 1],
    effective.reverse ? [0, xFrom] : [xFrom, 0]
  );
  const y = useTransform(
    mapToLocal,
    [0, 1],
    effective.reverse ? [0, yFrom] : [yFrom, 0]
  );

  const opacityRange = effective.reverse
    ? [effective.opacityTo ?? 1, effective.opacityFrom ?? 0]
    : [effective.opacityFrom ?? 0, effective.opacityTo ?? 1];

  const opacity = useTransform(
    mapToLocal,
    [0, 1],
    opacityRange as [number, number]
  );

  const initialStyle = effective.reverse
    ? { opacity: opacityRange[0] as number, x: 0 as number, y: 0 as number }
    : {
        opacity: opacityRange[0] as number,
        x: xFrom as number,
        y: yFrom as number,
      };

  return (
    <motion.div
      ref={ref}
      initial={initialStyle}
      style={{
        x,
        y,
        opacity,
        willChange: "transform, opacity",
      }}
      className={effective.className ?? ""}
    >
      {children}
    </motion.div>
  );
}
