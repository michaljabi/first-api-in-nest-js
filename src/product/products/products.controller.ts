import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import * as fsp from 'node:fs/promises';
import { ClientLanguage } from '../../middleware/client-language.decorator';
import { ApiKeyGuard } from '../../guards/api-key.guard';
import { SupportedLanguages } from '../../shared/language/language.service';

@Controller('products')
export class ProductsController {
  private logger = new Logger(ProductsController.name);

  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  addNew(@Body() product: NewProductDto) {
    this.logger.log('About to add');
    this.logger.log(product);
    return this.productsService.createNew(product);
  }

  @Get()
  getAll(@Query('name') searchByName: string) {
    return this.productsService.getAll(searchByName);
  }

  /*
  @Get('test-file')
  async getAllFromFile() {
    try {
      const fileData = await fsp.readFile('not-existing-file.txt');
      return { fileData };
    } catch {
      throw new NotFoundException(
        'Missing file. Cannot find not-existing-file.txt',
      );
    }
  }
  */

  @Get('sample-error')
  async getSampleError(@ClientLanguage() lang: SupportedLanguages) {
    throw new BadRequestException(
      lang === 'pl'
        ? 'Błąd z przykładową wiadomością'
        : 'Error with sample message',
    );
  }

  @Get('test-file')
  async getAllFromFile() {
    const fileData = await fsp.readFile('not-existing-file.txt');
    return { fileData };
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.getOneById(productId);
  }

  @Patch(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.update(productId, product);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.removeById(productId);
  }
}
