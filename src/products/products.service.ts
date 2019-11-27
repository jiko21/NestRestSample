import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products';
import { IProducts } from './products.interface';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Products) private readonly itemRepos: Repository<Products>) {}
  async add(item: IProducts): Promise<IProducts> {
    const newItem = this.itemRepos.create(item);
    return await this.itemRepos.save(newItem);
  }

  async findAll(): Promise<IProducts[]> {
    return await this.itemRepos.find();
  }
}
