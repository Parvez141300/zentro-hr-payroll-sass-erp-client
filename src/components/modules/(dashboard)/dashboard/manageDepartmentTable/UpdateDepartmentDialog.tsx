"use client";

import { updateCompanyDepartment } from "@/actions/department.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IDepartment } from "@/types/department.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface IUpdateDepartmentDialogProps {
  departmentData: IDepartment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateDepartmentDialog = ({
  departmentData,
  open,
  onOpenChange,
}: IUpdateDepartmentDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // dialog আলাদা আলাদা row-এর জন্য reuse হবে, তাই departmentData বদলালেই
  // form fields নতুন করে populate করে দিতে হবে
  useEffect(() => {
    if (departmentData) {
      setName(departmentData.name || "");
      setDescription(departmentData.description || "");
    }
  }, [departmentData]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!departmentData) throw new Error("No department selected");
      return updateCompanyDepartment(departmentData.id, {
        name,
        description,
      });
    },
    onSuccess: () => {
      toast.success("Department updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companyDepartments"] });
      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to update department"
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* কোনো DialogTrigger নেই — trigger হচ্ছে টেবিলের dropdown এর "Edit" item, বাইরে থেকে */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Department</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Human Resources"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={() => mutate()} disabled={isPending || !name.trim()}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDepartmentDialog;
