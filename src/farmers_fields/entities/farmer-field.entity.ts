import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['farmerId', 'fieldId'], { unique: true })
export class FarmerField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  farmerId: number;

  @Column()
  fieldId: number;
}
