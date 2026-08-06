/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ReactNode } from "react";

interface IDeletePopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  deleteAction: () => Promise<any>;
  queryKey?: string | string[];
  successMessage?: string;
  errorMessage?: string;
  isDeleting?: boolean;
  children?: ReactNode;
  itemName?: string;
}

const DeletePopUpDialog = ({
  open,
  onOpenChange,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  deleteAction,
  queryKey,
  successMessage = "Item deleted successfully",
  errorMessage = "Failed to delete item",
  isDeleting = false,
  children,
  itemName,
}: IDeletePopUpDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAction,
    onSuccess: () => {
      toast.success(successMessage);

      // Invalidate queries if queryKey is provided
      if (queryKey) {
        if (Array.isArray(queryKey)) {
          queryClient.invalidateQueries({ queryKey });
        } else {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
      }

      onOpenChange(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || errorMessage);
    },
  });

  // Custom description with item name
  const getDescription = () => {
    if (itemName) {
      return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
    }
    return description;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
          {children ? (
            children
          ) : (
            <p className="text-sm text-muted-foreground">{getDescription()}</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={isPending || isDeleting}>
                Cancel
              </Button>
            }
          ></DialogClose>
          <Button
            onClick={() => mutate()}
            disabled={isPending || isDeleting}
            variant="destructive"
          >
            {isPending || isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopUpDialog;
