import { ProductsService } from './products.service';
import { Products } from './products';
import { PRODUCTS, PRODUCTS_ARRAY } from '../__mocks__/products.mock';
import { createConnection, getConnection, getRepository, Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Products>;
  beforeEach(async () => {
    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Products],
      synchronize: true,
      logging: false,
      name: 'test_products_services',
    });
    repository = getRepository(Products, 'test_products_services');
    service = new ProductsService(repository);
    await repository.save(PRODUCTS_ARRAY);
    return connection;
  });

  afterEach(async () => {
    await getConnection('test_products_services').close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findALl', async () => {
    expect(await service.findAll()).toEqual(PRODUCTS_ARRAY);
  });

  it('add', async () => {
    const EXPECTED = [
      ...PRODUCTS_ARRAY,
      PRODUCTS,
    ];
    const returnValue = await service.add(PRODUCTS);
    expect(await repository.find()).toEqual(EXPECTED);
    expect(returnValue).toEqual(PRODUCTS);
  });
});
