// src/modules/contact/ContactForm.tsx
"use client";

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
import { Separator } from "@/components/ui/separator";
import { contactFormSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import {
  Mail,
  User,
  Phone,
  FileText,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const ContactForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("📧 Contact Form Submission: ", value);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setFormSuccess(
          "Message sent successfully! We'll get back to you within 24 hours.",
        );
        setFormError(null);
        form.reset();
        console.log("✅ Form submitted successfully!");

        // Clear success message after 5 seconds
        setTimeout(() => setFormSuccess(null), 5000);
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
        );
        console.error("❌ Form submission error:", error);
      }
    },
  });

  const handleReset = () => {
    form.reset();
    setFormError(null);
    setFormSuccess(null);
    console.log("🔄 Form has been reset");
  };

  return (
    <Card>
      <CardHeader className="space-y-5">
        <CardTitle className="font-bold text-center">
          Send Us a Message
        </CardTitle>
        <CardDescription className="text-center">
          Fill in the form below and our team will respond within 24 hours
        </CardDescription>

        {/* Success Message */}
        {formSuccess && (
          <div className="mb-4 p-3 bg-success/10 border border-success/20 text-success rounded-md flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>{formSuccess}</span>
          </div>
        )}

        {/* Error Message */}
        {formError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
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
          {/* Full Name field */}
          <form.Field
            name="fullName"
            validators={{
              onChange: contactFormSchema.shape.fullName,
            }}
          >
            {(field) => {
              return (
                <AppField
                  field={field}
                  label="Full Name*"
                  type="text"
                  placeholder="Enter your full name"
                  prepend={<User className="h-4 w-4 text-muted-foreground" />}
                />
              );
            }}
          </form.Field>

          {/* Email field */}
          <form.Field
            name="email"
            validators={{
              onChange: contactFormSchema.shape.email,
            }}
          >
            {(field) => {
              return (
                <AppField
                  field={field}
                  label="Email Address*"
                  type="email"
                  placeholder="Enter your email address"
                  prepend={<Mail className="h-4 w-4 text-muted-foreground" />}
                />
              );
            }}
          </form.Field>

          {/* Phone field */}
          <form.Field
            name="phone"
            validators={{
              onChange: contactFormSchema.shape.phone,
            }}
          >
            {(field) => {
              return (
                <AppField
                  field={field}
                  label="Phone Number"
                  type="text"
                  placeholder="+1 234 567 8900"
                  prepend={<Phone className="h-4 w-4 text-muted-foreground" />}
                />
              );
            }}
          </form.Field>

          {/* Subject field */}
          <form.Field
            name="subject"
            validators={{
              onChange: contactFormSchema.shape.subject,
            }}
          >
            {(field) => {
              return (
                <AppField
                  field={field}
                  label="Subject*"
                  type="text"
                  placeholder="How can we help?"
                  prepend={
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  }
                />
              );
            }}
          </form.Field>

          {/* Message field (custom textarea) */}
          <form.Field
            name="message"
            validators={{
              onChange: contactFormSchema.shape.message,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-1.5">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium text-foreground"
                  >
                    Message*
                  </label>
                  <div className="relative">
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Tell us about your inquiry..."
                      className={`min-h-30 w-full rounded-md border px-3 py-2 text-sm transition-colors
                        ${
                          isInvalid
                            ? "border-destructive ring-destructive/20"
                            : "border-input focus:border-primary focus:ring-primary/20"
                        }
                        bg-background text-foreground placeholder:text-muted-foreground
                        focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50
                      `}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={form.state.isSubmitting}
                      aria-invalid={isInvalid}
                    />
                  </div>
                  {isInvalid && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Submit and Reset buttons */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="w-full flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <Button
                  type="button"
                  onClick={() => {
                    handleReset();
                  }}
                >
                  Reset
                </Button>
                <AppButton
                  type="submit"
                  disabled={!canSubmit}
                  isPending={isSubmitting}
                  pendingLabel="Sending..."
                >
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                </AppButton>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <div className="flex items-center w-full">
          <Separator className="flex-1" />
          <span className="px-2 text-muted-foreground text-sm">Or</span>
          <Separator className="flex-1" />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Prefer to email us directly?{" "}
          <Link
            href="mailto:support@zentro.com"
            className="text-primary hover:underline"
          >
            support@zentro.com
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
