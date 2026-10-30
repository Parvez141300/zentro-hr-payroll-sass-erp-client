/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/types/user.type";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Building2,
  Mail,
} from "lucide-react";

const columnHelper = createColumnHelper<IUser>();

// ✅ Role badge variant map
const getRoleVariant = (
  role: string,
): "default" | "secondary" | "outline" | "destructive" => {
  const map: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    PLATFORM_SUPER_ADMIN: "destructive",
    SUPER_ADMIN: "default",
    HR_MANAGER: "default",
    ACCOUNTANT: "secondary",
    DEPARTMENT_HEAD: "secondary",
    EMPLOYEE: "outline",
  };
  return map[role] || "outline";
};

// ✅ Role label map
const getRoleLabel = (role: string) => {
  const map: Record<string, string> = {
    PLATFORM_SUPER_ADMIN: "Platform Admin",
    SUPER_ADMIN: "Super Admin",
    HR_MANAGER: "HR Manager",
    ACCOUNTANT: "Accountant",
    DEPARTMENT_HEAD: "Department Head",
    EMPLOYEE: "Employee",
  };
  return map[role] || role;
};

export const userColumn: ColumnDef<IUser, any>[] = [
  // ============================================
  // SERIAL
  // ============================================
  columnHelper.display({
    id: "serial",
    header: "SL",
    cell: (info) => info.row.index + 1,
  }),

  // ============================================
  // USER (avatar + name + email)
  // ============================================
  columnHelper.accessor("name", {
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className="text-xs">
              {initials || "US"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      );
    },
  }),

  // ============================================
  // ROLE
  // ============================================
  columnHelper.accessor("role", {
    header: "Role",
    cell: ({ getValue }) => {
      const role = getValue();
      return (
        <Badge variant={getRoleVariant(role)} className="text-xs">
          <ShieldCheck className="h-3 w-3 mr-1" />
          {getRoleLabel(role)}
        </Badge>
      );
    },
  }),

  // ============================================
  // COMPANY
  // ============================================
  columnHelper.accessor("companyId", {
    header: "Company",
    cell: ({ row }) => {
      const user = row.original;

      // Try to extract company name from the nested relation
      const companyName =
        user.superAdmin?.company?.name ||
        user.hrManager?.company?.name ||
        user.accountant?.company?.name ||
        user.departmentHead?.company?.name ||
        user.employee?.company?.name ||
        null;

      if (!companyName) {
        return (
          <span className="text-xs text-muted-foreground font-mono">
            {user.companyId.slice(0, 8)}...
          </span>
        );
      }

      return (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{companyName}</span>
        </div>
      );
    },
  }),

  // ============================================
  // EMAIL VERIFIED
  // ============================================
  columnHelper.accessor("emailVerified", {
    header: "Verified",
    cell: ({ getValue }) => {
      const verified = getValue();
      return verified ? (
        <Badge
          variant="default"
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      ) : (
        <Badge variant="secondary">
          <Mail className="h-3 w-3 mr-1" />
          Unverified
        </Badge>
      );
    },
  }),

  // ============================================
  // ACCOUNT STATUS
  // ============================================
  columnHelper.accessor("isActive", {
    header: "Status",
    cell: ({ getValue }) => {
      const isActive = getValue();
      return isActive ? (
        <Badge
          variant="default"
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Active
        </Badge>
      ) : (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      );
    },
  }),

  // ============================================
  // CREATED AT
  // ============================================
  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: ({ getValue }) => {
      const date = getValue();
      return (
        <span className="text-sm text-muted-foreground">
          {date ? format(new Date(date), "MMM dd, yyyy") : "N/A"}
        </span>
      );
    },
  }),

  // ============================================
  // UPDATED AT
  // ============================================
  columnHelper.accessor("updatedAt", {
    header: "Updated",
    cell: ({ getValue }) => {
      const date = getValue();
      return (
        <span className="text-sm text-muted-foreground">
          {date ? format(new Date(date), "MMM dd, yyyy") : "N/A"}
        </span>
      );
    },
  }),
];
