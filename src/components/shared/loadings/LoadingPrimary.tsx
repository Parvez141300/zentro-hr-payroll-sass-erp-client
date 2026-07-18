"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { TextShimmer } from "@/components/ui/shimmer";
import Image from "next/image";
import React from "react";

const LoadingPrimary = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="relative inline-flex overflow-hidden rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 h-32">
        <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-secondary text-sm font-medium text-primary backdrop-blur-3xl p-4">
          <div className="flex flex-col items-center">
            <Image
              src={"/assets/logos/zentro-logo-1.png"}
              alt="zentor-logo-1"
              width={40}
              height={40}
              className="w-auto h-auto animate-pulse"
              loading="eager"
            />
            <TextShimmer
              colors={["transparent", "rgba(100, 50, 207)", "transparent"]}
              duration={5}
              className="text-[10px]"
            >
              HR & Payroll | SASS
            </TextShimmer>
          </div>
          <BorderBeam
            size={0}
            duration={1}
            delay={0}
            radius={9999}
            borderWidth={2}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPrimary;
