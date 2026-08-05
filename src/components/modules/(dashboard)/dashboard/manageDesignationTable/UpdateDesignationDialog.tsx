"use client";

import { getCompanyDepartments } from "@/actions/department.action";
import { updateCompanyDesignation } from "@/actions/designation.action";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IDepartment } from "@/types/department.type";
import { IDesignation } from "@/types/designation.type";

interface IUpdateDesignationDialogProps {
  designationData: IDesignation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateDesignationDialog = ({
  designationData,
  open,
  onOpenChange,
}: IUpdateDesignationDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const queryClient = useQueryClient();

  // Fetch departments
  const { data: departments, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  // Populate form when designationData changes
  useEffect(() => {
    if (designationData) {
      setTitle(designationData.title || "");
      setDescription(designationData.description || "");
      setDepartmentId(designationData.departmentId || "");
    }
  }, [designationData]);

  // Update designation mutation
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!designationData) throw new Error("No designation selected");
      return updateCompanyDesignation(designationData.id, {
        departmentId: departmentId || designationData.departmentId,
        title: title || designationData.title,
        description: description || designationData.description,
      });
    },
    onSuccess: () => {
      toast.success("Designation updated successfully");
      queryClient.invalidateQueries({ queryKey: ["companyDesignations"] });
      onOpenChange(false);
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to update designation",
      );
    },
  });

  // Get department name by ID
  const getDepartmentName = (id: string) => {
    if (!departments?.data?.data) return id;
    const department = departments.data.data.find((dept) => dept.id === id);
    return department?.name || id;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* No DialogTrigger - triggered from table dropdown */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Designation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Department Select Field */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-department">Department *</Label>
            <Select
              value={departmentId}
              onValueChange={(value) => setDepartmentId(value as string)}
              disabled={isDepartmentsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a department">
                  {departmentId ? getDepartmentName(departmentId) : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Departments</SelectLabel>
                  {departments?.data?.data?.map((department: IDepartment) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                  {(!departments?.data?.data ||
                    departments.data.data.length === 0) && (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      No departments found
                    </div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!departmentId && (
              <p className="text-sm text-red-500">Please select a department</p>
            )}
          </div>

          {/* Title Field */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-title">Title *</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            onClick={() => mutate()}
            disabled={isPending || !title.trim() || !departmentId}
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDesignationDialog;
