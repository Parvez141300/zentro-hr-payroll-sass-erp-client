"use client";

import { deleteCompanyDesignation } from "@/actions/designation.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDesignation } from "@/types/designation.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface IUpdateDepartmentDialogProps {
  designationData: IDesignation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteDesignationDialog = ({
  designationData,
  open,
  onOpenChange,
}: IUpdateDepartmentDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!designationData) throw new Error("No designation selected");
      return deleteCompanyDesignation(designationData.id);
    },
    onSuccess: () => {
      toast.success("Department deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["companyDesignations"] });
      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete designation",
      );
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* কোনো DialogTrigger নেই — trigger হচ্ছে টেবিলের dropdown এর "Edit" item, বাইরে থেকে */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Designation</DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this designation? This action cannot
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

export default DeleteDesignationDialog;
