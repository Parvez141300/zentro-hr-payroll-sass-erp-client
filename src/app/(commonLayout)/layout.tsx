import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="max-w-7xl mx-auto">{children}</main>
    </>
  );
};

export default CommonLayout;
