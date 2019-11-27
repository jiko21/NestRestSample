import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PRODUCTS, PRODUCTS_ARRAY } from '../__mocks__/products.mock';
import { Products } from './products';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Products Controller', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, {
          provide: getRepositoryToken(Products),
          useClass: Repository,
        }],
      controllers: [ProductsController],
    }).compile();
    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('getProducts', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(PRODUCTS_ARRAY);
    expect(await controller.getProducts()).toBe(PRODUCTS_ARRAY);
  });

  it('add', async () => {
    jest.spyOn(service, 'add').mockResolvedValue(PRODUCTS);
    expect(await controller.add(PRODUCTS)).toBe(PRODUCTS);
  });
});
