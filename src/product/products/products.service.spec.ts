import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { ProductModel } from './product.model';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: CategoriesService,
          useValue: {},
        },
        {
          provide: 'ProductModel',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return product if its stock number is above or equal requested quantity', async () => {
    //Arrange
    const id = 22;
    const quantity = 10;
    const foundProduct = { id, stock: 10 } as ProductModel;

    jest
      .spyOn(service, 'findProduct')
      .mockReturnValue(Promise.resolve(foundProduct));

    //Act
    const product = await service.checkProductOnStock(id, quantity);

    //Assert
    expect(product).toEqual(foundProduct);
  });
});
