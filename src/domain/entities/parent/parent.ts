import type { CreateParentInput } from '@/application/commands/types/create-parent.types';
import type { parentGenders, parentStatuses } from './parent.types';

export class Parent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly mobileNo: string,
    public readonly age: number,
    public readonly gender: parentGenders,
    public readonly dob: Date,
    public readonly city: string,
    public readonly state: string,
    public readonly country: string,
    public readonly postalCode: string,
    public readonly otp: string,
    public readonly otpExpiry: number,
    public readonly status: parentStatuses,
    public readonly createdAt: number,
    public readonly updatedAt: number,
    public readonly deletedAt: number | null
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.age < 18) {
      throw new Error('Age must be at least 18');
    }

    if (!this.email) {
      throw new Error('Email is required');
    }

    if (!this.mobileNo) {
      throw new Error('Mobile number is required');
    }

    if (!this.postalCode) {
      throw new Error('Postal code is required');
    }
  }

  public static fromCreateInput(input: CreateParentInput): Parent {
    return new Parent(
      crypto.randomUUID(),
      input.name,
      input.email,
      input.mobileNo,
      input.age,
      input.gender,
      input.dob,
      input.city,
      input.state,
      input.country,
      input.postalCode,
      input.otp,
      input.otpExpiry,
      input.status,
      input.createdAt,
      input.updatedAt,
      input.deletedAt
    );
  }
}
