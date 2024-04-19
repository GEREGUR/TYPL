import React, { ReactNode } from "react";

interface SelectProps {
  className?: string;
  children: ReactNode;
}

export function Select({ className, children }: SelectProps) {
  return <div className={className}>{children}</div>;
}
