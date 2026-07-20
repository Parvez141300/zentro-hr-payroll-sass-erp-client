"use client";

import { loginUser } from "@/actions/auth.action";
import AppButton from "@/components/shared/form/AppButton";
import AppField from "@/components/shared/form/AppField";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [show, setShow] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User logging in...");
      try {
        const userLogin = await loginUser(value);
        if (userLogin?.success) {
          setFormError(null);
          toast.success("Successfully Logged in", { id: toastId });
          form.reset();
          router.push("/");
        }
        if (!userLogin) {
          setFormError("This user does not exist");
          toast.error("This user does not exist", { id: toastId });
        }
      } catch (error) {
        setFormError(
          error instanceof Error ? error.message : "Submission failed",
        );
        toast.error(
          error instanceof Error ? error.message : "Submission failed",
          { id: toastId },
        );
      }
    },
  });
  return (
    <Card>
      <CardHeader className="space-y-5">
        <CardTitle className="font-bold text-center">
          Login to your account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>

        {/* Error Message */}
        {formError && (
          <h3 className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md overflow-auto">
            {formError}
          </h3>
        )}
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* email field */}
          <form.Field
            name="email"
            validators={{
              onChange: loginSchema.shape.email,
            }}
          >
            {(field) => {
              return (
                <AppField
                  field={field}
                  label="Email*"
                  type="email"
                  placeholder="Enter your email"
                  prepend={<Mail />}
                />
              );
            }}
          </form.Field>

          {/* password field */}
          <form.Field
            name="password"
            validators={{
              onChange: loginSchema.shape.password,
            }}
          >
            {(field) => (
              <AppField
                label="Password*"
                field={field}
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                prepend={<LockKeyhole />}
                append={
                  <AppButton
                    type="button"
                    varient="ghost"
                    onClick={() => {
                      setShow((prev) => !prev);
                    }}
                  >
                    {show ? <Eye /> : <EyeOff />}
                  </AppButton>
                }
              />
            )}
          </form.Field>

          {/* submit button */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="w-full flex justify-end">
                <AppButton
                  type="submit"
                  disabled={!canSubmit}
                  isPending={isSubmitting}
                  pendingLabel="Logging in..."
                >
                  <>
                    <LogIn /> Login
                  </>
                </AppButton>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Link
          href="/forgot-password"
          className="m-auto text-sm underline-offset-4 hover:underline"
        >
          Forgot your password?
        </Link>
        <div className="flex items-center w-full">
          <Separator className={"flex-1"} />
          <span className="px-2">Or</span>
          <Separator className={"flex-1"} />
        </div>
        <FieldDescription className="px-6 text-center">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
