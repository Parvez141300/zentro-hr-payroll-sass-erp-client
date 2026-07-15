"use client";

import { registerSuperAdmin } from "@/actions/auth.action";
import AppButton from "@/components/shared/form/AppButton";
import AppField from "@/components/shared/form/AppField";
import { Button } from "@/components/ui/button";
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
import {
  completeRegisterFormSchema,
  registerCompanySchema,
  registerUserSchema,
} from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import {
  BookUser,
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  PhoneCall,
  UserRoundArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [step, setStep] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      step1: {
        companyName: "",
        phone: "",
        address: "",
      },
      step2: {
        name: "",
        email: "",
        password: "",
      },
    },
    validators: {
      onSubmit: completeRegisterFormSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Registering...", {
        position: "bottom-center",
      });
      try {
        setFormError(null);
        const registerPayloadData = {
          ...value.step1,
          ...value.step2,
        };

        const register = await registerSuperAdmin(registerPayloadData);

        toast.success("Registration successful", {
          id: toastId,
          position: "bottom-center",
        });

        console.log(register);
      } catch (error) {
        setFormError(
          error instanceof Error ? error.message : "Submission failed",
        );
        console.log("This error is from register form", error);
        toast.error(
          error instanceof Error ? error.message : "Submission failed",
          {
            id: toastId,
            position: "bottom-center",
          },
        );
      }
    },
  });
  return (
    <Card>
      <CardHeader className="space-y-5 relative">
        <CardTitle className="text-center font-bold">
          Hi there, Welcome to Zentor Hr & Payroll
        </CardTitle>
        <CardDescription className="text-center">
          Fill in the form below to create your account and also your company
        </CardDescription>
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 0
                      ? "bg-primary text-secondary"
                      : "bg-secondary text-primary"
                  }`}
                >
                  1
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step >= 1 ? "bg-primary" : "bg-secondary"
                  }`}
                />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? "bg-primary text-secondary"
                      : "bg-secondary text-primary"
                  }`}
                >
                  2
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Company Details</span>
            <span>Account Setup</span>
          </div>
        </div>

        {/* Error Message */}
        {formError && (
          <p className="mb-4 p-3 bg-accent border border-primary/20 text-red-700 rounded-md overflow-auto">
            {formError}
          </p>
        )}
      </CardHeader>

      <CardContent>
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {step === 0 && (
            <form.FormGroup
              name="step1"
              // succsful step 1 form
              onGroupSubmit={() => {
                setStep(1);
                setFormError(null);
              }}
            >
              {(group) => (
                <div className="space-y-4">
                  {/* company name field */}
                  <form.Field
                    name="step1.companyName"
                    validators={{
                      onChange: registerCompanySchema.shape.companyName,
                    }}
                  >
                    {(field) => (
                      <AppField
                        label="Company Name*"
                        field={field}
                        type="text"
                        placeholder="Enter Company Name"
                        prepend={<Building2 />}
                      />
                    )}
                  </form.Field>

                  {/* phone number field */}
                  <form.Field
                    name="step1.phone"
                    validators={{
                      onChange: registerCompanySchema.shape.phone,
                    }}
                  >
                    {(field) => (
                      <AppField
                        label="Phone Number*"
                        field={field}
                        type="text"
                        placeholder="Enter Phone Number"
                        prepend={<PhoneCall />}
                      />
                    )}
                  </form.Field>

                  {/* address field */}
                  <form.Field
                    name="step1.address"
                    validators={{
                      onChange: registerCompanySchema.shape.address,
                    }}
                  >
                    {(field) => (
                      <AppField
                        label="Address"
                        field={field}
                        type="text"
                        placeholder="Enter Address"
                        prepend={<BookUser />}
                      />
                    )}
                  </form.Field>

                  {/* next button */}
                  <div className="flex justify-end">
                    <AppButton
                      varient="secondary"
                      type="button"
                      onClick={() => {
                        group.handleSubmit();
                      }}
                    >
                      <>
                        Next <ChevronRight />
                      </>
                    </AppButton>
                  </div>
                </div>
              )}
            </form.FormGroup>
          )}

          {step === 1 && (
            <form.FormGroup name="step2">
              {(group) => (
                <div className="space-y-1">
                  {/* name field */}
                  <form.Field
                    name="step2.name"
                    validators={{
                      onChange: registerUserSchema.shape.name,
                    }}
                  >
                    {(field) => (
                      <AppField
                        label="Name*"
                        field={field}
                        type="text"
                        placeholder="Enter Name"
                        prepend={<CircleUser />}
                      />
                    )}
                  </form.Field>

                  {/* email field */}
                  <form.Field
                    name="step2.email"
                    validators={{
                      onChange: registerUserSchema.shape.email,
                    }}
                  >
                    {(field) => (
                      <AppField
                        label="Email*"
                        field={field}
                        type="email"
                        placeholder="Enter Email"
                        prepend={<Mail />}
                      />
                    )}
                  </form.Field>

                  {/* password field */}
                  <form.Field
                    name="step2.password"
                    validators={{
                      onChange: registerUserSchema.shape.password,
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

                  {/* back, reset and register button */}
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <>
                        {/* back and submit button */}
                        <div className="flex justify-end items-center gap-2">
                          {/* next button */}
                          <AppButton
                            varient="secondary"
                            type="button"
                            onClick={() => {
                              setStep(0);
                            }}
                          >
                            <>
                              <ChevronLeft /> Back
                            </>
                          </AppButton>
                          {/* reset button */}
                          <Button
                            type="reset"
                            onClick={(e) => {
                              // Avoid unexpected resets of form elements (especially <select> elements)
                              e.preventDefault();
                              form.reset();
                              setStep(0);
                            }}
                          >
                            Reset
                          </Button>
                          {/* register button */}
                          <AppButton
                            onClick={() => {
                              group.handleSubmit();
                            }}
                            varient="default"
                            type="submit"
                            isPending={isSubmitting}
                            pendingLabel="Registering..."
                            disabled={!canSubmit}
                          >
                            <UserRoundArrowLeft /> Register
                          </AppButton>
                        </div>
                      </>
                    )}
                  </form.Subscribe>
                </div>
              )}
            </form.FormGroup>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <div className="flex items-center w-full">
          <Separator className={"flex-1"} />
          <span className="px-2">Or</span>
          <Separator className={"flex-1"} />
        </div>
        <FieldDescription className="px-6 text-center">
          Already have an account? <Link href="/login">Login</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
