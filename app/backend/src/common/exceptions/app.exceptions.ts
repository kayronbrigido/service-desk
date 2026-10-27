import { HttpException, HttpStatus } from '@nestjs/common';

type AppExceptionOptionsType = {
  fields: Array<string>;
};

export class AppException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    options?: AppExceptionOptionsType,
  ) {
    const responseBody = {
      message,
      ...options,
      fields: options?.fields,
    };

    super(responseBody, status);
  }
}
