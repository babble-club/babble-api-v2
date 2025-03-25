import type { parentGenders, parentStatuses } from '@/domain/entities/parent/parent.types';

export interface CreateParentInput {
  name: string;
  email: string;
  mobileNo: string;
  age: number;
  gender: parentGenders;
  dob: Date;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  otp: string;
  otpExpiry: number;
  status: parentStatuses;
  createdAt: number;
  updatedAt: number;
  deletedAt: number | null;
}
