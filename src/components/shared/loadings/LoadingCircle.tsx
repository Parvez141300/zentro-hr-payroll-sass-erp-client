import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

const LoadingCircle = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        Loading...
      </Button>
    </div>
  );
};

export default LoadingCircle;
