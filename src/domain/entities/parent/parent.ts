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
    public readonly deletedAt: number
  ) {
    this.validate();
  }

  private validate(): void {}
}
