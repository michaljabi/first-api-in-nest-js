import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class NewProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsUrl({ require_protocol: true })
  image: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;
}
