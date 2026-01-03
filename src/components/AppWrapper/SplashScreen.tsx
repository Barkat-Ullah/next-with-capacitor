"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative size-32">
          {/* Mock Logo */}
          <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-12" />
          <div className="absolute inset-0 bg-primary rounded-3xl flex items-center justify-center">
            <span className="text-4xl font-bold text-primary-foreground italic">
              BC
            </span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter">Blog App</h1>
          <p className="text-muted-foreground">Stories worth sharing</p>
        </div>

        <Loader2 className="size-8 animate-spin text-primary mt-8" />
      </motion.div>
    </div>
  );
}
