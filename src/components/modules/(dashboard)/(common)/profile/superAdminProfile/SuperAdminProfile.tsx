// components/modules/(dashboard)/(common)/profile/superAdminProfile/SuperAdminProfile.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useCallback } from "react";
import {
  User,
  Mail,
  Lock,
  Building2,
  Calendar,
  Shield,
  Save,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { AvatarUpload } from "@/components/shared/uploadFile/ProfileUpload";
import { IUser } from "@/types/user.type";
import Image from "next/image";

const SuperAdminProfile = ({ userData }: { userData: IUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: userData.name || "",
    phone: userData.superAdmin?.phone || "",
  });

  const { mutate: updateProfile, isPending } = useProfileUpdate();

  // Use useCallback to memoize the file change handler
  const handleFileChange = useCallback((file: FileWithPreview | null) => {
    setSelectedFile(file);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      phone: formData.phone,
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
      phone: userData.superAdmin?.phone || "",
    });
    setSelectedFile(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-t-lg">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            {isEditing ? "Edit Profile" : "Super Admin Profile"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Company level administrator with full company access
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
              <div className="relative h-24 w-24 rounded-full overflow-hidden">
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
              Company & System Information (Non-Editable)
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
              <div className="space-y-2">
                <Label className="text-muted-foreground">Company</Label>
                <div className="flex items-center space-x-2 p-2 bg-background rounded-md">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span>{userData.companyId}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Role</Label>
                <div className="flex items-center space-x-2 p-2 bg-background rounded-md">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <Badge className="bg-blue-500">Super Admin</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Joined</Label>
                <div className="flex items-center space-x-2 p-2 bg-background rounded-md">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{format(new Date(userData.createdAt), "PPP")}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Last Updated</Label>
                <div className="flex items-center space-x-2 p-2 bg-background rounded-md">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{format(new Date(userData.updatedAt), "PPP")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editable fields */}
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

export default SuperAdminProfile;