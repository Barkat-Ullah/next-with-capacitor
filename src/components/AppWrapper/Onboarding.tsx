"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STEPS = [
  {
    title: "Level Up Your Game",
    description:
      "Connect with world-class coaches and experts to accelerate your growth.",
    image: "https://i.ibb.co.com/d0T25pVT/3046744.jpg",
  },
  {
    title: "Endless Opportunities",
    description:
      "Access a platform built for coaching opportunities across various disciplines.",
    image: "https://i.ibb.co.com/qGmXMrd/9045622.jpg",
  },
  {
    title: "Excellence Starts Here",
    description:
      "Your journey to excellence starts with the right guidance and community.",
    image: "https://i.ibb.co.com/5gVCJxwM/10315317.jpg",
  },
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-90 flex flex-col p-6">
      {/* <div className="flex justify-end">
        <button onClick={onComplete} className="text-muted-foreground">
          Skip
        </button>
      </div> */}

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative size-72">
              <Image
                src={STEPS[currentStep].image || "/placeholder.svg"}
                alt={STEPS[currentStep].title}
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {STEPS[currentStep].title}
              </h2>
              <p className="text-muted-foreground px-4">
                {STEPS[currentStep].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-8 pb-8">
        <div className="flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <button
          className="w-full h-14 text-lg rounded-2xl bg-green-300"
          onClick={handleNext}
        >
          {currentStep === STEPS.length - 1 ? "Let's Go" : "Next"}
        </button>
      </div>
    </div>
  );
}
