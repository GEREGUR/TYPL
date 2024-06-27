"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type AuthProviderProps = {
  children: ReactNode;
  session?: Session;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  session,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchIntervalInBackground: false,
            // cacheTime: 10_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};
