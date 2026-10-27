/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ErrorCode } from 'src/common/exceptions/enums/erro-codes.enum';
import { AppException } from './app.exceptions';

function flattenValidationErrors(
  errors: ValidationError[],
  prefix = '',
): string[] {
  const fields: string[] = [];
  for (const err of errors) {
    const key = prefix ? `${prefix}.${err.property}` : err.property;
    if (err.constraints && Object.keys(err.constraints).length > 0) {
      fields.push(key);
    }
    if (err.children?.length) {
      fields.push(...flattenValidationErrors(err.children, key));
    }
  }
  return fields;
}

@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (value === undefined || value === null) {
      throw new AppException(ErrorCode.MISSING_FIELD, 400);
    }

    const object = plainToInstance(metatype, value, {
      enableImplicitConversion: true,
    });
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: false,
    });

    if (errors.length > 0) {
      const formattedErrors = flattenValidationErrors(errors);

      throw new AppException(ErrorCode.MISSING_FIELD, 400, {
        fields: formattedErrors,
      });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
