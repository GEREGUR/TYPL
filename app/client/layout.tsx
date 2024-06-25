import React from "react";
import { AuthProvider } from "../providers";
import { Navbar } from "../../components/navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </main>
  );
}
