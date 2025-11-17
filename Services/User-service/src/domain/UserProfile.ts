
export type UserRole = "student" | "teacher" | "admin" | "moderator";

export interface UserProfile {
  id: string;        // ID propio del user-service
  userId: string;    // ID que viene del auth-service
  name: string;
  email: string;
  role: UserRole;
}
