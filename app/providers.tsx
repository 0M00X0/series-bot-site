"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Suspense } from 'react'
import Loading from "@/components/Loading";
export interface ProvidersProps {
  children: React.ReactNode;
  session: Session;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Suspense fallback={<Loading />}>
        <NextUIProvider>{children}</NextUIProvider>
        <Next13ProgressBar
          height="4px"
          color="#0A2FFF"
          options={{ showSpinner: true }}
          showOnShallow
        />
        </Suspense>
      </SessionProvider>
    </>
  );
}
