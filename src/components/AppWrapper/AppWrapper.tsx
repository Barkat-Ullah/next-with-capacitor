"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplashScreen } from "./SplashScreen";
import { Onboarding } from "./Onboarding";

type AppState = "splash" | "onboarding" | "main";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>("splash");

  useEffect(() => {
    // Initial splash screen delay
    const timer = setTimeout(() => {
      //* for login and register case
      // localStorage.setItem("is_authenticated", "true");

      //*In a real app, we'd check if user is new or logged in
      // const isAuthenticated =
      //   localStorage.getItem("is_authenticated") === "true";

      // if (isAuthenticated) {
      //   setAppState("main");
      // } else {
      //   setAppState("onboarding");
      // }
      setAppState("onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {appState === "splash" && (
          <motion.div key="splash" exit={{ opacity: 0 }}>
            <SplashScreen />
          </motion.div>
        )}

        {appState === "onboarding" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Onboarding onComplete={() => setAppState("main")} />
          </motion.div>
        )}

        {/* {appState === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthFlow onAuthSuccess={() => setAppState("main")} />
          </motion.div>
        )} */}

        {appState === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-24"
          >
            {children}
            {/* <BottomNavbar /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
