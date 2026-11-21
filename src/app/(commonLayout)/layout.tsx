import { Footer2 } from "@/components/shared/footer/footer2";
import { Navbar1 } from "@/components/shared/navbar/navbar1";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="">
        <Navbar1 className="" />
      </nav>
      <main className="max-w-7xl mx-auto my-10 mt-32 px-4 w-full">
        {children}
      </main>
      <footer>
        <Footer2 />
      </footer>
    </>
  );
};

export default CommonLayout;
