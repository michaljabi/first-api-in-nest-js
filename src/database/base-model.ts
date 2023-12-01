import { CreateNotFoundErrorArgs, Model, QueryContext } from 'objection';
import { NotFoundException } from '@nestjs/common';

export class BaseModel extends Model {
  static createNotFoundError(
    queryContext: QueryContext,
    props: CreateNotFoundErrorArgs,
  ) {
    return new NotFoundException(props);
  }
}
