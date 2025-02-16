import type { parentGenders, parentStatuses } from '@/domain/entities/parent/parent.types';
import { pgTable, integer, varchar, timestamp, pgEnum, date } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('parentGender', ['m', 'f', 'o']);
export const statusEnum = pgEnum('parentStatus', ['Active', 'Inactive', 'Deactivated', 'Banned']);

// Define a table for parents
export const parents = pgTable('parents', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 256 }).notNull(),
  mobileNo: varchar({ length: 256 }).notNull(),
  age: integer(),
  gender: genderEnum(),
  dob: date(),
  city: varchar({ length: 256 }),
  state: varchar({ length: 256 }),
  country: varchar({ length: 256 }),
  postalCode: varchar({ length: 6 }),
  otp: varchar({ length: 6 }),
  otpExpiry: timestamp(),
  status: statusEnum().default('Active').notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
});

export type ParentRow = {
  id: number;
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
  deletedAt: number;
};
