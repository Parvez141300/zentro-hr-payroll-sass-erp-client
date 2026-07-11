"use client";

import AppButton from "@/components/shared/form/AppButton";
import AppField from "@/components/shared/form/AppField";
import Logo from "@/components/shared/logo/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { loginSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { ArrowLeftFromLine, Mail, Send } from "lucide-react";
import Link from "next/link";
import React from "react";

const ForgotPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("this is form register form: ", value);
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Submission failed",
        );
      }
    },
  });
  return (
    <Card className="max-w-5xl p-5">
      <CardHeader className="text-center space-y-2">
        <Logo />
        <CardTitle>Forgot Your Password</CardTitle>
        <CardDescription>
          Enter your email. We will send you an email otp to reset your
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field
            name="email"
            validators={{
              onChange: loginSchema.shape.email,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email"
                type="email"
                placeholder="Enter your email"
                prepend={<Mail />}
              />
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="space-y-2">
                <AppButton
                  className="w-full"
                  type="submit"
                  disabled={!canSubmit}
                  isPending={isSubmitting}
                  pendingLabel="Sending..."
                >
                  <>
                    <Send /> Send
                  </>
                </AppButton>
                <AppButton varient="secondary" type="button" className="w-full">
                  <Link href={"/login"} className="flex items-center gap-1">
                    <ArrowLeftFromLine />
                    Back To Login
                  </Link>
                </AppButton>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
      <CardFooter>
        <FieldDescription className="flex justify-center gap-2">
          <span>
            @{new Date().getFullYear()} Zentro Hr & Payroll. All rights
            reserved.
          </span>
          <Link href={"/terms"}>Terms & Conditions</Link>
          <Link href={"/privacy"}>Privacy Policy</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
