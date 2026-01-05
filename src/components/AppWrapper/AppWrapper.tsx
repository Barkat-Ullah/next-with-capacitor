"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SplashScreen } from "./SplashScreen";
import { Onboarding } from "./Onboarding";
import Login from "@/app/login/page";
import { Preferences } from "@capacitor/preferences";

// type AppState = "splash" | "onboarding" | "main";
type AppState = "splash" | "onboarding" | "auth" | "main";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>("splash");

 useEffect(() => {
   const initializeApp = async () => {
     await new Promise((resolve) => setTimeout(resolve, 2000));
     try {

       const { value } = await Preferences.get({ key: "is_authenticated" });

       if (value === "true") {
         setAppState("main");
       } else {
         setAppState("onboarding");
       }
     } catch (error) {
       console.error("Initialization error:", error);
       setAppState("onboarding");
     }
   };

   initializeApp();
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
            <Onboarding onComplete={() => setAppState("auth")} />
            {/* <Onboarding onComplete={() => setAppState("main")} /> */}
          </motion.div>
        )}

        {appState === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Login onAuthSuccess={() => setAppState("main")} />
          </motion.div>
        )}

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
