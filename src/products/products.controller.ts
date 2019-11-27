import { Controller, Get, Body, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products';
import { IProducts } from './products.interface';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<IProducts[]> {
    return this.productsService.findAll();
  }

  @Post()
  add(@Body() products: IProducts): Promise<IProducts> {
    return this.productsService.add(products);
  }
}
