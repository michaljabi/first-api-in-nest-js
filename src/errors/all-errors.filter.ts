import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SqliteError } from 'better-sqlite3';
import { ConfigService } from '@nestjs/config';

@Catch(Error)
export class AllErrorsFilter implements ExceptionFilter {
  private logger = new Logger(AllErrorsFilter.name);

  constructor(private readonly configService: ConfigService<NodeJS.AppEnv>) {}

  // rozwiązanie zadania 7.7
  private wrapInEnvelope(
    message: string,
    exception: any,
    statusCode = 500,
    error = 'Internal Server Error',
  ) {
    // rozwiązanie zadania 13.6
    const isDevEnv =
      this.configService.get<NodeJS.AppEnv['NODE_ENV']>('NODE_ENV') ===
      'development';
    return {
      message,
      error,
      statusCode,
      ...{
        exception: isDevEnv ? exception : undefined,
      },
    };
  }

  // rozwiązanie zadania 7.7
  private isFileSystemError(exception: any): boolean {
    return [
      'EACCES',
      'EEXIST',
      'ENOENT',
      'ENOTDIR',
      'ENOTEMPTY',
      'EMFILE',
      'EISDIR',
    ].includes(exception?.code);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.debug(`Client preferred language is ${request['language']}`);

    if (exception instanceof HttpException) {
      // jeżeli to NestJS'owy błąd, instancja HttpException, to obsłuż ją tak jak do tej pory:
      response.status(exception.getStatus()).json(exception.getResponse());
      // nie idź dalej, żeby nie zrobić "podwójnego response" na jeden request!
      this.logger.debug(`(${exception.getStatus()}): ${exception.message}`);
      this.logger.error(exception.getResponse());
      return;
    }
    // jeśli błąd posiada pole `code` sprawdź, czy to nie file-system error
    if (this.isFileSystemError(exception)) {
      this.logger.error(exception.message);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(this.wrapInEnvelope('File i/o error (check logs)', exception));
    }
    if (exception instanceof SqliteError) {
      this.logger.error(exception.message);
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(this.wrapInEnvelope('DB query error', exception));
    }
    // Jeśli to nieznany błąd (inny niż HttpException):
    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(this.wrapInEnvelope('Unknown error', exception));
    this.logger.error(`Unknown error: ${exception.message}`);
  }
}
