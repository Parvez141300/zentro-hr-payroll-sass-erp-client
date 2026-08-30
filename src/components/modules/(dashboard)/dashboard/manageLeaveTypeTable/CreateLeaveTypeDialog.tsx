"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { createCompanyLeaveType } from "@/actions/leaveType.action";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  CreateLeaveTypeFormValues,
  createLeaveTypeSchema,
} from "@/zod/leaveType.validation";
import AppField from "@/components/shared/form/AppField";

const CreateLeaveTypeDialog = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateLeaveTypeFormValues) =>
      await createCompanyLeaveType({
        name: data.name,
        description: data.description || null,
        daysAllowed: parseInt(data.daysAllowed),
        isPaid: data.isPaid,
        isActive: data.isActive,
      }),
    onSuccess: () => {
      toast.success("Leave Type created successfully");
      queryClient.invalidateQueries({ queryKey: ["companyLeaveTypes"] });
      setOpen(false);
      form.reset();
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err?.message) || "Failed to create leave type",
      );
    },
  });

  // TanStack Form
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      daysAllowed: "",
      isPaid: true,
      isActive: true,
    } as CreateLeaveTypeFormValues,
    validators: {
      onChange: createLeaveTypeSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Create Leave Type
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Leave Type</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-2"
        >
          {/* Name Field */}
          <form.Field
            name="name"
            validators={{
              onChange: z.string().min(1, "Name is required"),
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Name *"
                type="text"
                placeholder="Enter leave type name"
              />
            )}
          </form.Field>

          {/* Description Field */}
          <form.Field
            name="description"
            validators={{
              onChange: z.string().optional(),
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Short description..."
                />
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Days Allowed Field */}
          <form.Field
            name="daysAllowed"
            validators={{
              onChange: z.string().min(1, "Days allowed is required"),
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Days Allowed *"
                type="number"
                placeholder="Enter number of days"
              />
            )}
          </form.Field>

          {/* Is Paid Switch */}
          <form.Field name="isPaid">
            {(field) => (
              <div className="flex items-center justify-between">
                <Label htmlFor="isPaid">Is Paid</Label>
                <Switch
                  id="isPaid"
                  checked={field.state.value === true}
                  onCheckedChange={(checked: boolean) => {
                    field.handleChange(checked);
                  }}
                />
              </div>
            )}
          </form.Field>

          {/* Is Active Switch */}
          <form.Field name="isActive">
            {(field) => (
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Is Active</Label>
                <Switch
                  id="isActive"
                  checked={field.state.value === true}
                  onCheckedChange={(checked: boolean) => {
                    field.handleChange(checked);
                  }}
                />
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              }
            ></DialogClose>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending ? "Creating..." : "Create"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLeaveTypeDialog;
