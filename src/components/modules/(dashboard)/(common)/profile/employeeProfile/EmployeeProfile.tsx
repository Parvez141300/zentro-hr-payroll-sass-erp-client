// components/modules/(dashboard)/(common)/profile/employeeProfile/EmployeeProfile.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback } from "react";
import {
  User,
  Mail,
  Lock,
  Building2,
  Calendar,
  Briefcase,
  CreditCard,
  Heart,
  Users,
  DollarSign,
  Save,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { IUser } from "@/types/user.type";
import { Gender } from "@/types/enums.type";
import Image from "next/image";

const EmployeeProfile = ({ userData }: { userData: IUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: userData.name || "",
    phone: userData.employee?.phone || "",
    dateOfBirth: userData.employee?.dateOfBirth
      ? format(new Date(userData.employee.dateOfBirth), "yyyy-MM-dd")
      : "",
    gender: userData.employee?.gender,
    address: userData.employee?.address || "",
    nidNumber: userData.employee?.nidNumber || "",
    bloodGroup: userData.employee?.bloodGroup || "",
    bankName: userData.employee?.bankName || "",
    bankAccount: userData.employee?.bankAccount || "",
    emergencyName: userData.employee?.emergencyName || "",
    emergencyPhone: userData.employee?.emergencyPhone || "",
    emergencyRelation: userData.employee?.emergencyRelation || "",
  });

  const { mutate: updateProfile, isPending } = useProfileUpdate();

  const handleFileChange = useCallback((file: FileWithPreview | null) => {
    setSelectedFile(file);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      nidNumber: formData.nidNumber,
      bloodGroup: formData.bloodGroup,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      emergencyName: formData.emergencyName,
      emergencyPhone: formData.emergencyPhone,
      emergencyRelation: formData.emergencyRelation,
    };

    updateProfile({
      userId: userData.id,
      role: userData.role,
      data: dataToSend,
      file: selectedFile?.file instanceof File ? selectedFile.file : null,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: userData.name || "",
      phone: userData.employee?.phone || "",
      dateOfBirth: userData.employee?.dateOfBirth
        ? format(new Date(userData.employee.dateOfBirth), "yyyy-MM-dd")
        : "",
      gender: userData.employee?.gender,
      address: userData.employee?.address || "",
      nidNumber: userData.employee?.nidNumber || "",
      bloodGroup: userData.employee?.bloodGroup || "",
      bankName: userData.employee?.bankName || "",
      bankAccount: userData.employee?.bankAccount || "",
      emergencyName: userData.employee?.emergencyName || "",
      emergencyPhone: userData.employee?.emergencyPhone || "",
      emergencyRelation: userData.employee?.emergencyRelation || "",
    });
    setSelectedFile(null);
  };

  const nonEditableFields = [
    {
      label: "Employee Code",
      value: userData.employee?.employeeCode || "N/A",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Department",
      value: userData.employee?.department?.name || "N/A",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      label: "Designation",
      value: userData.employee?.designation?.name || "N/A",
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: "Employment Type",
      value: userData.employee?.employmentType || "N/A",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Status",
      value: userData.employee?.status || "N/A",
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: "Join Date",
      value: userData.employee?.joinDate
        ? format(new Date(userData.employee.joinDate), "PPP")
        : "N/A",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      label: "Basic Salary",
      value: userData.employee?.basicSalary
        ? `$${userData.employee.basicSalary.toFixed(2)}`
        : "N/A",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      label: "House Allowance",
      value: userData.employee?.houseAllowance
        ? `$${userData.employee.houseAllowance.toFixed(2)}`
        : "N/A",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      label: "Medical Allowance",
      value: userData.employee?.medicalAllowance
        ? `$${userData.employee.medicalAllowance.toFixed(2)}`
        : "N/A",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      label: "Transport Allowance",
      value: userData.employee?.transportAllowance
        ? `$${userData.employee.transportAllowance.toFixed(2)}`
        : "N/A",
      icon: <DollarSign className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between bg-linear-to-r from-sky-500/10 to-blue-500/10 rounded-t-lg">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-sky-500" />
            {isEditing ? "Edit Profile" : "Employee Profile"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Employee profile with personal and professional information
          </p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            {isEditing ? (
              <AvatarUpload
                defaultAvatar={userData.image || undefined}
                onFileChange={handleFileChange}
                maxSize={5 * 1024 * 1024}
              />
            ) : (
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-sky-500/20">
                <Image
                  src={userData.image || "https://github.com/shadcn.png"}
                  alt="profile-image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 96px) 100vw, 96px"
                  priority
                />
              </div>
            )}
          </div>

          {/* Non-editable fields */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Employment & Salary Information (Non-Editable)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email</Label>
                <div className="flex items-center space-x-2 p-2 bg-background rounded-md">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{userData.email}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">User ID</Label>
                <div className="flex items-center space-x-2 p-2 bg-background rounded-md">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{userData.id}</span>
                </div>
              </div>
              {nonEditableFields.map((field, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-muted-foreground">{field.label}</Label>
                  <div className="flex items-center space-x-2 p-2 bg-background rounded-md">
                    {field.icon}
                    <span>{field.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editable fields - Personal Information */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gender: value}))
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                    <SelectItem value={Gender.OTHER}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nidNumber">NID Number</Label>
                <Input
                  id="nidNumber"
                  value={formData.nidNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nidNumber: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter NID number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bloodGroup: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="A+, B+, O+, AB+ etc."
                />
              </div>
            </div>
          </div>

          {/* Editable fields - Bank Information */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Bank Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bankName: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter bank name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bankAccount: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter bank account number"
                />
              </div>
            </div>
          </div>

          {/* Editable fields - Emergency Contact */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Contact Name</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emergencyName: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter contact name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emergencyPhone: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter contact phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyRelation">Relation</Label>
                <Input
                  id="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emergencyRelation: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Spouse, Parent, Sibling etc."
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                <Save className="w-4 h-4 mr-2" />
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeProfile;
