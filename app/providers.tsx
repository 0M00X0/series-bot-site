"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Suspense } from 'react'
import Loading from "@/components/core/Loading";

import i18n, { changeLanguage } from '@/lib/i18n';
import { useEffect } from "react";
export interface ProvidersProps {
  children: React.ReactNode;
  session: Session;
}

export function Providers({ children, session }: ProvidersProps) {
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const language = savedLanguage || 'en';
    changeLanguage(language);
  }, []);
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
