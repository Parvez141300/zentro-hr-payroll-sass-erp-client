"use client";

import { deleteCompanyDepartment } from "@/actions/department.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDepartment } from "@/types/department.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface IUpdateDepartmentDialogProps {
  departmentData: IDepartment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteDepartmentDialog = ({
  departmentData,
  open,
  onOpenChange,
}: IUpdateDepartmentDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!departmentData) throw new Error("No department selected");
      return deleteCompanyDepartment(departmentData.id);
    },
    onSuccess: () => {
      toast.success("Department updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companyDepartments"] });
      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to update department",
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* কোনো DialogTrigger নেই — trigger হচ্ছে টেবিলের dropdown এর "Edit" item, বাইরে থেকে */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this department? This action cannot
            be undone.
          </p>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={() => mutate()} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDepartmentDialog;
