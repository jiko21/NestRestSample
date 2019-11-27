import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IProducts } from './products.interface';

@Entity()
export class Products implements IProducts {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string;
}
