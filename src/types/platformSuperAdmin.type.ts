import { IUser } from "./user.type";

// ============ PlatformSuperAdmin ============
export interface IPlatformSuperAdmin {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  photoUrl: string | null;
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: IUser;
}