// Write tests for update command using bun test

import { UpdateParentCommand } from './update-parent.command';
import type { UpdateParentInput } from './types/update-parent.types';
import type { ParentRepository } from '@/domain/interfaces/repositories/parent.repository';
import { Result } from '@/shared/utils/result.utils';
import { expect, describe, it, beforeEach } from 'bun:test';
import { Parent } from '@/domain/entities/parent/parent';
import type { parentGenders } from '@/domain/entities/parent/parent.types';

let parentRepo: ParentRepository;
let command: UpdateParentCommand;

beforeEach(() => {
  parentRepo = {
    findById: async () => null,
    findByMobileNo: async () => null,
    save: async (parent: Parent) => Result.ok(parent),
    update: async (_, parent: Parent) => Result.ok(parent),
    softDelete: async () => Result.ok({} as Parent),
    hardDelete: async () => Result.ok({} as Parent),
    findDeleted: async () => [],
    restore: async () => Result.ok({} as Parent),
  };
  command = new UpdateParentCommand(parentRepo);
});

it('should fail to update a non-existent parent', async () => {
  parentRepo.findById = async () => null;

  const result = await command.execute({
    id: 'non-existent-id',
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobileNo: '1234567890',
    age: 30,
    gender: 'Male' as parentGenders,
    dob: new Date('2000-01-01'),
    city: 'New York',
    state: 'New York',
    country: 'United States',
    postalCode: '12345',
    otp: '123456',
    otpExpiry: 3600,
    status: 'Active',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    deletedAt: null,
  });

  expect(result.isFailure).toBe(true);
  expect(result.error).toBe('Parent not found');
});

it('should handle update with invalid input', async () => {
  // Assuming invalid age is a negative number
  const result = await command.execute({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobileNo: '1234567890',
    age: -1, // invalid age
    gender: 'Male' as parentGenders,
    dob: new Date('2000-01-01'),
    city: 'New York',
    state: 'New York',
    country: 'United States',
    postalCode: '12345',
    otp: '123456',
    otpExpiry: 3600,
    status: 'Active',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    deletedAt: null,
  });

  expect(result.isFailure).toBe(true);
  expect(result.error).toBe('Invalid age provided');
});

it('should update a parent with minimal details', async () => {
  parentRepo.findById = async () =>
    new Parent(
      '1',
      'John Doe',
      'john.doe@example.com',
      '1234567890',
      30,
      'Male' as parentGenders,
      new Date('2000-01-01'),
      'New York',
      'New York',
      'United States',
      '12345',
      '123456',
      3600,
      'Active',
      new Date().getTime(),
      new Date().getTime(),
      null
    );

  const result = await command.execute({
    id: '1',
    name: 'Jane Doe', // Only name changed
    email: 'john.doe@example.com',
    mobileNo: '1234567890',
    age: 30,
    gender: 'Male' as parentGenders,
    dob: new Date('2000-01-01'),
    city: 'New York',
    state: 'New York',
    country: 'United States',
    postalCode: '12345',
    otp: '123456',
    otpExpiry: 3600,
    status: 'Active',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    deletedAt: null,
  });

  expect(result.isSuccess).toBe(true);
  expect(result.value.name).toBe('Jane Doe');
});

describe('UpdateParentCommand', () => {
  let parentRepo: ParentRepository;
  let command: UpdateParentCommand;

  beforeEach(() => {
    parentRepo = {
      findById: async () => null,
      findByMobileNo: async () => null,
      save: async (parent: Parent) => Result.ok(parent),
      update: async (_, parent: Parent) => Result.ok(parent),
      softDelete: async () => Result.ok({} as Parent),
      hardDelete: async () => Result.ok({} as Parent),
      findDeleted: async () => [],
      restore: async () => Result.ok({} as Parent),
    };
    command = new UpdateParentCommand(parentRepo);
  });

  it('should update a parent', async () => {
    const result = await command.execute({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobileNo: '1234567890',
      age: 30,
      gender: 'Male' as parentGenders,
      dob: new Date('2000-01-01'),
      city: 'New York',
      state: 'New York',
      country: 'United States',
      postalCode: '12345',
      otp: '123456',
      otpExpiry: 3600,
      status: 'Active',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      deletedAt: null,
    });
    expect(result).toBeInstanceOf(Parent);
  });
});
