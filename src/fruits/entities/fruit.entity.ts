import { Entity, Column, PrimaryGeneratedColumn /* Index */ } from 'typeorm';

@Entity()
// @Index(['name', 'variety'], { unique: true })
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  variety: string;
}
