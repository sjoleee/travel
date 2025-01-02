"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

import { getQueryClient } from "./getQueryClient";

const TanstackQueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryClientProvider;
