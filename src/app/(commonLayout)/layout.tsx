import { Navbar1 } from "@/components/shared/navbar/navbar1";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <Navbar1 />
      </nav>
      <main className="max-w-7xl mx-auto">{children}</main>
    </>
  );
};

export default CommonLayout;
