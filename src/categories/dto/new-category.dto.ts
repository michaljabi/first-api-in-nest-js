import { IsNotEmpty, IsString } from 'class-validator';

export class NewCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
