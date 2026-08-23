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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { createCompanyLeaveType } from "@/actions/leaveType.action";

const CreateLeaveTypeDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [daysAllowed, setDaysAllowed] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await createCompanyLeaveType({
        name,
        description: description || null,
        daysAllowed: parseInt(daysAllowed),
        isPaid,
        isActive,
      }),
    onSuccess: () => {
      toast.success("Leave Type created successfully");
      queryClient.invalidateQueries({ queryKey: ["companyLeaveTypes"] });
      setOpen(false);
      setName("");
      setDescription("");
      setDaysAllowed("");
      setIsPaid(true);
      setIsActive(true);
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err?.message) || "Failed to create leave type",
      );
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

        <div className="space-y-4 py-2">
          {/* Name Field */}
          <div className="space-y-1.5">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Annual Leave"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
            />
          </div>

          {/* Days Allowed Field */}
          <div className="space-y-1.5">
            <Label htmlFor="daysAllowed">Days Allowed *</Label>
            <Input
              id="daysAllowed"
              type="number"
              value={daysAllowed}
              onChange={(e) => setDaysAllowed(e.target.value)}
              placeholder="e.g. 20"
              min="1"
            />
          </div>

          {/* Is Paid Switch */}
          <div className="flex items-center justify-between">
            <Label htmlFor="isPaid">Is Paid</Label>
            <Switch id="isPaid" checked={isPaid} onCheckedChange={setIsPaid} />
          </div>

          {/* Is Active Switch */}
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Is Active</Label>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                onClick={() => mutate()}
                disabled={isPending || !name.trim() || !daysAllowed.trim()}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            }
          >
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLeaveTypeDialog;
