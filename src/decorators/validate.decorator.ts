import { applyDecorators } from '@nestjs/common';
import {
  MinLength,
  IsNumber,
  MaxLength,
  IsUrl,
  IsJSON,
  IsOptional,
  IsString,
  IsObject,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const VString = (
  description: string,
  required = true,
  minLength = 1,
  maxLength = 1024,
) => {
  if (required) {
    return applyDecorators(
      IsString(),
      MinLength(minLength, { message: `请输入${description}` }),
      MaxLength(maxLength, {
        message: `${description}最长为${maxLength}个字符`,
      }),
      ApiProperty({ required, description }),
    );
  }
  return applyDecorators(
    IsOptional(),
    IsString(),
    MinLength(minLength, { message: `请输入${description}` }),
    MaxLength(maxLength, { message: `${description}最长为${maxLength}个字符` }),
    ApiProperty({ required, description }),
  );
};

export const VUrl = (
  description: string,
  required = true,
  options = {},
  maxLength = 1024,
) => {
  if (required) {
    return applyDecorators(
      IsUrl(options, { message: `${description}不正确` }),
      MaxLength(maxLength, {
        message: `${description}最长为${maxLength}个字符`,
      }),
      ApiProperty({ required, description }),
    );
  }
  return applyDecorators(
    IsOptional(),
    IsUrl(options, { message: `${description}不正确` }),
    MaxLength(maxLength, { message: `${description}最长为${maxLength}个字符` }),
    ApiProperty({ required, description }),
  );
};

export const VNumber = (
  description: string,
  required = true,
  min = 1,
  max = 9999999999,
) => {
  if (required) {
    return applyDecorators(
      IsNumber({}, { message: `${description}不正确` }),
      Min(min),
      Max(max),
      ApiProperty({ required, description, minimum: min, default: min }),
    );
  }
  return applyDecorators(
    IsOptional(),
    IsNumber({}, { message: `${description}不正确` }),
    Min(min),
    Max(max),
    ApiProperty({ required, description, minimum: min, default: min }),
  );
};

export const VJson = (description: string, required = true) => {
  if (required) {
    return applyDecorators(
      IsJSON({ message: `${description}不正确` }),
      ApiProperty({ required, description }),
    );
  }
  return applyDecorators(
    IsOptional(),
    IsJSON({ message: `${description}不正确` }),
    ApiProperty({ required, description }),
  );
};
export const VObject = (description: string, required: boolean = true) => {
  if (required) {
    return applyDecorators(
      IsObject({ message: `${description}不正确` }),
      ApiProperty({ required, description }),
    );
  }
  return applyDecorators(
    IsOptional(),
    IsObject({ message: `${description}不正确` }),
    ApiProperty({ required, description }),
  );
};

export const VNumberArray = (
  description: string,
  required = true,
  min = 1,
  max = 9999999999,
) => {
  if (required) {
    return applyDecorators(
      IsArray(),
      IsNumber({}, { each: true, message: `${description}不正确` }),
      Min(min, { each: true }),
      Max(max, { each: true }),
      ApiProperty({
        type: [Number],
        required,
        description,
        minItems: 1,
        default: [min],
      }),
    );
  }
  return applyDecorators(
    IsOptional(),
    IsArray(),
    IsNumber({}, { each: true, message: `${description}不正确` }),
    Min(min, { each: true }),
    Max(max, { each: true }),
    ApiProperty({
      type: [Number],
      required,
      description,
      minItems: 1,
      default: [min],
    }),
  );
};
