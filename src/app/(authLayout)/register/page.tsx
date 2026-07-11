import RegisterForm from "@/components/modules/authentication/RegisterForm";
import { FieldDescription } from "@/components/ui/field";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/assets/logos/zentro-logo-2.png"
              alt="zentor-logo-2"
              width={150}
              height={500}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-10 flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
        <FieldDescription className="flex justify-center gap-2">
          <span>
            @{new Date().getFullYear()} Zentro Hr & Payroll. All rights reserved.
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
      </div>
    </div>
  );
};

export default RegisterPage;
