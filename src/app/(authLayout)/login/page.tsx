import LoginForm from "@/components/modules/authentication/LoginForm";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10 order-2">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Zentro
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block order-1">
          <Image
            src="/assets/authImages/login.jpg"
            alt="login image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="h-72 absolute bg-primary/80 w-full bottom-0 text-secondary flex flex-col pl-10 justify-center">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold">
                Lets empower <br /> our employees today
              </h1>
              <p>We help you grow your business with us and your employees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
