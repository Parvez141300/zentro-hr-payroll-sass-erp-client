export interface IRegisterPayload {
    name: string;
    companyName: string;
    email: string;
    password: string;
    phone: string;
    address?: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IRegisterResponse {
    token: string;
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        role: string;
        isActive: boolean;
        isDeleted: boolean;
        deletedAt?: Date | null | undefined;
        companyId?: string | null | undefined;
    };
}

export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        role: string;
        isActive: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | null | undefined;
    };
}

export interface IResetPasswordPayload {
    email: string;
    otp: string;
    newPassword: string;
}

// types/auth.type.ts

export enum UserRole {
    PLATFORM_SUPER_ADMIN = "PLATFORM_SUPER_ADMIN",
    SUPER_ADMIN = "Super_ADMIN",
    HR_MANAGER = "HR_MANAGER",
    ACCOUNTANT = "ACCOUNTANT",
    DEPARTMENT_HEAD = "DEPARTMENT_HEAD",
    EMPLOYEE = "EMPLOYEE",
}

export interface IPlatformSuperAdmin {
    id: string;
    userId: string;
    name: string;
    photoUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ISuperAdmin {
    id: string;
    userId: string;
    name: string;
    phone: string;
    photoUrl: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    companyId: string;
}

export interface IHrManager {
    id: string;
    userId: string;
    name: string;
    phone: string;
    photoUrl: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    companyId: string;
}

export interface IAccountant {
    id: string;
    userId: string;
    name: string;
    phone: string;
    photoUrl: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    companyId: string;
}

export interface IDepartmentHead {
    id: string;
    userId: string;
    name: string;
    phone: string;
    photoUrl: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    companyId: string;
    departmentId?: string;
}

export interface IEmployee {
    id: string;
    userId: string;
    name: string;
    phone: string;
    photoUrl: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    companyId: string;
}

export interface ISessionUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt: string | null;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    companyId: string;
    platformSuperAdmin: IPlatformSuperAdmin | null;
    superAdmin: ISuperAdmin | null;
    hrManager: IHrManager | null;
    accountant: IAccountant | null;
    departmentHead: IDepartmentHead | null;
    employee: IEmployee | null;
}