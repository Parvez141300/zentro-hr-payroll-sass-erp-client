import { IAccountant } from "./accountant.type";
import { IDepartmentHead } from "./departmentHead.type";
import { IEmployee } from "./employee.type";
import { UserRole } from "./enums.type";
import { IHrManager } from "./hrManager.type";
import { IPlatformSuperAdmin } from "./platformSuperAdmin.type";
import { ISuperAdmin } from "./superAdmin.type";


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


