import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  farmerId: number;

  @Column()
  customerId: number;

  @Column()
  fieldName: string;

  @Column()
  fieldLocation: string;

  @Column()
  fruitId: number;
}
