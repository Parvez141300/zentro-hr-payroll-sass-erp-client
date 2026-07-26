// components/modules/(dashboard)/(common)/profile/departmentHeadProfile/DepartmentHeadProfile.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useCallback } from "react";
import {
  User,
  Mail,
  Lock,
  Building2,
  Calendar,
  Briefcase,
  Users,
  Save,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { IUser } from "@/types/user.type";
import Image from "next/image";

const DepartmentHeadProfile = ({ userData }: { userData: IUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: userData.name || "",
    phone: userData.departmentHead?.phone || "",
    officeLocation: userData.departmentHead?.officeLocation || "",
    linkedinUrl: userData.departmentHead?.linkedinUrl || "",
    bio: userData.departmentHead?.bio || "",
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
      officeLocation: formData.officeLocation,
      linkedinUrl: formData.linkedinUrl,
      bio: formData.bio,
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
      phone: userData.departmentHead?.phone || "",
      officeLocation: userData.departmentHead?.officeLocation || "",
      linkedinUrl: userData.departmentHead?.linkedinUrl || "",
      bio: userData.departmentHead?.bio || "",
    });
    setSelectedFile(null);
  };

  const nonEditableFields = [
    {
      label: "Employee Code",
      value: userData.departmentHead?.employeeCode || "N/A",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      label: "Join Date",
      value: userData.departmentHead?.joinDate
        ? format(new Date(userData.departmentHead.joinDate), "PPP")
        : "N/A",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      label: "Department",
      value: userData.departmentHead?.department?.name || "N/A",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      label: "Designation",
      value: userData.departmentHead?.designation?.name || "N/A",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between bg-linear-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" />
            {isEditing ? "Edit Profile" : "Department Head Profile"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Department leadership with team management responsibilities
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
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-amber-500/20">
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
                <Label htmlFor="officeLocation">Office Location</Label>
                <Input
                  id="officeLocation"
                  value={formData.officeLocation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      officeLocation: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter office location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      linkedinUrl: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Enter LinkedIn profile URL"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio / About</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                  placeholder="Tell us about yourself..."
                  rows={3}
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

export default DepartmentHeadProfile;
