import { PartialType } from '@nestjs/mapped-types';
import { NewProductDto } from './new-product.dto';

export class UpdateProductDto extends PartialType(NewProductDto) {}
