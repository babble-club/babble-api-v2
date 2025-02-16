import { Parent } from '@/domain/entities/parent/parent';
import type { parentGenders, parentStatuses } from '@/domain/entities/parent/parent.types';
import type { ParentRow } from '../schemas/parent.schema';

export function toEntity(row: ParentRow): Parent {
  return new Parent(
    row.id.toString(),
    row.name,
    row.email,
    row.mobileNo,
    row.age,
    row.gender as parentGenders,
    row.dob,
    row.city,
    row.state,
    row.country,
    row.postalCode,
    row.otp,
    row.otpExpiry,
    row.status as parentStatuses,
    row.createdAt,
    row.updatedAt,
    row.deletedAt
  );
}

export function toDatabase(parent: Parent): Omit<ParentRow, 'id'> {
  return {
    name: parent.name,
    email: parent.email,
    mobileNo: parent.mobileNo,
    age: parent.age,
    gender: parent.gender,
    dob: parent.dob,
    city: parent.city,
    state: parent.state,
    country: parent.country,
    postalCode: parent.postalCode,
    otp: parent.otp,
    otpExpiry: parent.otpExpiry,
    status: parent.status,
    createdAt: parent.createdAt,
    updatedAt: parent.updatedAt,
    deletedAt: parent.deletedAt,
  };
}
