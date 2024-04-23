"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

type AuthProviderProps = {
  children: ReactNode;
  session?: Session;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
