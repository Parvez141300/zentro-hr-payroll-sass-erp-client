"use client";
import { BorderBeam } from "@/components/border-beam";
import { Button } from "@/components/ui/button";
import React from "react";

const BorderBeamButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button size={"sm"} className="relative inline-flex h-12 overflow-hidden rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-secondary px-8 py-1 text-sm font-medium text-primary backdrop-blur-3xl">
        {children}
        <BorderBeam
          size={40}
          duration={4}
          delay={0}
          radius={9999}
          borderWidth={2}
        />
      </span>
    </Button>
  );
};

export default BorderBeamButton;
