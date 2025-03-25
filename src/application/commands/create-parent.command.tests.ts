// Write tests for parent creation command using bun test

import { Parent } from '@/domain/entities/parent/parent';
import type { ParentRepository } from '@/domain/interfaces/repositories/parent.repository';
import { expect, describe, it, beforeEach } from 'bun:test';
import { CreateParentCommand } from './create-parent.command';
import type { parentGenders } from '@/domain/entities/parent/parent.types';
import { Result } from '@/shared/utils/result.utils';

describe('CreateParentCommand', () => {
  let parentRepo: ParentRepository;
  let command: CreateParentCommand;

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
    command = new CreateParentCommand(parentRepo);
  });

  it('should create a parent', async () => {
    const result = await command.execute({
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
