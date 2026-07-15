import RegisterForm from "@/components/modules/authentication/RegisterForm";
import Logo from "@/components/shared/logo/Logo";
import { FieldDescription } from "@/components/ui/field";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-col gap-10 flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
        <FieldDescription className="flex flex-col lg:flex-row justify-center text-center gap-2">
          <span>
            @{new Date().getFullYear()} Zentro Hr & Payroll. All rights
            reserved.
          </span>
          <Link href={"/terms"}>Terms & Conditions</Link>
          <Link href={"/privacy"}>Privacy Policy</Link>
        </FieldDescription>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/assets/authImages/register.jpg"
          alt="register image"
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
  );
};

export default RegisterPage;
