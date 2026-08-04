"use client";

import { getCompanyDepartments } from "@/actions/department.action";
import { createCompanyDesignation } from "@/actions/designation.action";
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
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { IDepartment } from "@/types/department.type";

const CreateDesignationDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const queryClient = useQueryClient();

  // Fetch departments
  const { data: departments, isLoading: isDepartmentsLoading } = useQuery({
    queryKey: ["companyDepartments"],
    queryFn: () => getCompanyDepartments(),
  });

  // Create designation mutation
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createCompanyDesignation({
        departmentId: departmentId,
        title,
        description,
      }),
    onSuccess: () => {
      toast.success("Designation created successfully");
      queryClient.invalidateQueries({ queryKey: ["companyDesignations"] });
      // Reset form
      setOpen(false);
      setTitle("");
      setDescription("");
      setDepartmentId("");
    },
    onError: (err) => {
      toast.error(
        (err instanceof Error && err?.message) ||
          "Failed to create designation",
      );
    },
  });

  // Handle form submission
  const handleSubmit = () => {
    if (!departmentId) {
      toast.error("Please select a department");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a designation title");
      return;
    }
    mutate();
  };

  // Get department name by ID
  const getDepartmentName = (id: string) => {
    if (!departments?.data?.data) return id;
    const department = departments.data.data.find((dept) => dept.id === id);
    return department?.name || id;
  };

  // Reset form when dialog closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setDepartmentId("");
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Create Designation
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Designation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Department Select Field */}
          <div className="space-y-1.5">
            <Label htmlFor="department">Department *</Label>
            <Select
              value={departmentId}
              onValueChange={(value) => setDepartmentId(value as string)}
              disabled={isDepartmentsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a department">
                  {/* This is the key - children of SelectValue shows the selected value */}
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
                  {(!departments?.data ||
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
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
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
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            onClick={handleSubmit}
            disabled={isPending || !title.trim() || !departmentId}
          >
            {isPending ? "Creating..." : "Create Designation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDesignationDialog;
