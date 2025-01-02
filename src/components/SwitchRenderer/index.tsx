import type { ReactElement } from "react";

interface SwitchRendererProps<T extends string | number | boolean> {
  caseBy: Partial<Record<T extends boolean ? "true" | "false" : T, ReactElement | null>>;
  value: T | null;
  defaultComponent?: ReactElement | null;
}

const SwitchRenderer = <T extends string | number | boolean>({
  value,
  caseBy,
  defaultComponent = null,
}: SwitchRendererProps<T>) => {
  if (value === null) {
    return defaultComponent;
  }

  const key = value as T extends boolean ? "true" | "false" : T;

  return caseBy[key] ?? defaultComponent;
};

export default SwitchRenderer;
