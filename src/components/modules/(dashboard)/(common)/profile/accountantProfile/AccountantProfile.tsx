// components/modules/(dashboard)/(common)/profile/accountantProfile/AccountantProfile.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useCallback } from "react";
import {
  User,
  Mail,
  Lock,
  Calendar,
  Briefcase,
  FileText,
  Save,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { IUser } from "@/types/user.type";
import Image from "next/image";

const AccountantProfile = ({ userData }: { userData: IUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: userData.name || "",
    phone: userData.accountant?.phone || "",
    caLicenseNumber: userData.accountant?.caLicenseNumber || "",
    taxIdNumber: userData.accountant?.taxIdNumber || "",
    bankName: userData.accountant?.bankName || "",
    bankAccount: userData.accountant?.bankAccount || "",
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
      caLicenseNumber: formData.caLicenseNumber,
      taxIdNumber: formData.taxIdNumber,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
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
      phone: userData.accountant?.phone || "",
      caLicenseNumber: userData.accountant?.caLicenseNumber || "",
      taxIdNumber: userData.accountant?.taxIdNumber || "",
      bankName: userData.accountant?.bankName || "",
      bankAccount: userData.accountant?.bankAccount || "",
    });
    setSelectedFile(null);
  };

  const nonEditableFields = [
    {
      label: "Employee Code",
      value: userData.accountant?.employeeCode || "N/A",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Join Date",
      value: userData.accountant?.joinDate
        ? format(new Date(userData.accountant.joinDate), "PPP")
        : "N/A",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      label: "Fiscal Year Access",
      value: userData.accountant?.fiscalYearAccess
        ? "✅ Enabled"
        : "❌ Disabled",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between bg-linear-to-r from-green-500/10 to-emerald-500/10 rounded-t-lg">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-500" />
            {isEditing ? "Edit Profile" : "Accountant Profile"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Financial management and accounting professional
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
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-green-500/20">
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
              Employment Information (Non-Editable)
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

          {/* Editable fields */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Personal & Professional Information
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
                <Label htmlFor="caLicenseNumber">CA License Number</Label>
                <Input
                  id="caLicenseNumber"
                  value={formData.caLicenseNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      caLicenseNumber: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter CA license number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxIdNumber">Tax ID Number</Label>
                <Input
                  id="taxIdNumber"
                  value={formData.taxIdNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      taxIdNumber: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter tax ID number"
                />
              </div>
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

export default AccountantProfile;
