// hooks/useProfileUpdate.ts
import { updateSuperAdminProfile } from "@/actions/superAdmin.action";
import { UserRole } from "@/types/enums.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


interface IProfileUpdateParams {
    userId: string;
    role: UserRole;
    data: Record<string, unknown>; // JSON data
    file?: File | null; // Optional file
}

export const useProfileUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, role, data, file }: IProfileUpdateParams) => {
            // Get the appropriate endpoint based on role
            const endpoint = getProfileEndpoint(role, userId);

            // Create FormData
            const formData = new FormData();

            // Append data as JSON string
            formData.append("data", JSON.stringify({ info: data }));

            // Append file if exists
            if (file) {
                formData.append("file", file);
            }

            console.log('this is from formData', formData);

            const response = await updateSuperAdminProfile(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });

            return response.data;
        },
        onSuccess: () => {
            toast.success("Profile updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["user-info"] });
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to update profile.");
        },
    });
};

// Helper function to get the correct endpoint
const getProfileEndpoint = (role: UserRole, userId: string): string => {
    const endpoints: Record<UserRole, string> = {
        PLATFORM_SUPER_ADMIN: `/api/v1/admins/platform-super-admin/${userId}`,
        Super_ADMIN: `/api/v1/admins/super-admin/${userId}`,
        HR_MANAGER: `/api/v1/hr-managers/${userId}`,
        ACCOUNTANT: `/api/v1/accountants/${userId}`,
        DEPARTMENT_HEAD: `/api/v1/department-heads/${userId}`,
        EMPLOYEE: `/api/v1/employees/${userId}`,
    };
    return endpoints[role];
};