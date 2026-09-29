export type UserRole = "CITIZEN" | "ADMIN" | "FIELD_OFFICER";

export interface UserProfile {
  uid: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  role: UserRole;
  department?: string;
  ward?: string;
  city?: string;
  designation?: string;
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  role: UserRole | null;
}
