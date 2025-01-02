"use client";

import { domMax, LazyMotion } from "motion/react";
import { type PropsWithChildren } from "react";

const LazyMotionProvider = ({ children }: PropsWithChildren) => {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
};

export default LazyMotionProvider;
