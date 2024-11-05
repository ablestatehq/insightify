export type userModal = {
  email: string
  lastName: string
  firstName: string
}

export interface UserProfile {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  expoPushToken: string | null;
  firstName: string | null;
  gender: string | null;
  id: number;
  isAvailable: boolean;
  lastName: string | null;
  photo: string | null;
  primaryDomain: string | null;
  provider: string;
  secondaryDomain: string | null;
  skills: string | null;
  updatedAt: string;
  username: string;
}

export interface MemberInfo{
  email: string;
  country: string;
  phoneNumber: string;
  primaryRole: string[];
  isWhatsAppPhone: boolean;
}

export interface ProfileType {
  // photo: string;
  firstName: string;
  lastName: string;
  gender: string;
  skills: string[];
  isAvailable: boolean;
  primaryDomain: string;
  secondaryDomain: string;
}