import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type AppButtonProps = {
  children?: React.ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  isPending?: boolean;
  pendingLabel?: string;
  varient?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary"
    | "outline";
  onClick?: () => void;
};

const AppButton = ({
  varient,
  className,
  type,
  children,
  disabled,
  isPending,
  pendingLabel,
  onClick,
}: AppButtonProps) => {
  return (
    <Button
      variant={varient}
      className={className}
      type={type}
      disabled={disabled || isPending}
      onClick={onClick}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" /> {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default AppButton;
