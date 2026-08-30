"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { updateCompanyLeaveType } from "@/actions/leaveType.action";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  UpdateLeaveTypeFormValues,
  updateLeaveTypeSchema,
} from "@/zod/leaveType.validation";
import AppField from "@/components/shared/form/AppField";
import { ILeaveType } from "@/types/leaveType.type";

interface EditLeaveTypeDialogProps {
  leaveTypeData: ILeaveType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditLeaveTypeDialog = ({
  leaveTypeData,
  open,
  onOpenChange,
}: EditLeaveTypeDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateLeaveTypeFormValues) => {
      if (!leaveTypeData) throw new Error("No leave type selected");

      return await updateCompanyLeaveType(leaveTypeData.id, {
        name: data.name || leaveTypeData.name,
        description: data.description || leaveTypeData.description,
        daysAllowed: data.daysAllowed
          ? parseInt(data.daysAllowed)
          : leaveTypeData.daysAllowed,
        isPaid: data.isPaid || leaveTypeData.isPaid,
        isActive: data.isActive || leaveTypeData.isActive,
      });
    },
    onSuccess: () => {
      toast.success("Leave Type updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companyLeaveTypes"] });
      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err?.message) || "Failed to update leave type",
      );
    },
  });

  // TanStack Form
  const form = useForm({
    defaultValues: {
      name: leaveTypeData?.name || "",
      description: leaveTypeData?.description || "",
      daysAllowed: leaveTypeData?.daysAllowed?.toString() || "",
      isPaid: leaveTypeData?.isPaid ?? true,
      isActive: leaveTypeData?.isActive ?? true,
    } as UpdateLeaveTypeFormValues,
    validators: {
      onChange: updateLeaveTypeSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  // Reset form when leaveTypeData changes
  useEffect(() => {
    if (leaveTypeData && open) {
      form.reset({
        name: leaveTypeData.name || "",
        description: leaveTypeData.description || "",
        daysAllowed: leaveTypeData.daysAllowed?.toString() || "",
        isPaid: leaveTypeData.isPaid ?? true,
        isActive: leaveTypeData.isActive ?? true,
      });
    }
  }, [leaveTypeData, open, form]);

  if (!leaveTypeData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Leave Type</DialogTitle>
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
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked)}
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
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked)}
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
                  {isPending ? "Updating..." : "Update"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeaveTypeDialog;
