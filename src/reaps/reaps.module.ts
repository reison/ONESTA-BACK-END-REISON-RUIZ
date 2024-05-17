import { Module } from '@nestjs/common';
import { ReapsService } from './reaps.service';
import { ReapsController } from './reaps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reap } from './entities/reap.entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { FarmersService } from 'src/farmers/farmers.service';
import { Customer } from 'src/customers/entities/customer.entity';
import { CustomersService } from 'src/customers/customers.service';
import { Field } from 'src/fields/entities/field.entity';
import { FieldsService } from 'src/fields/fields.service';
import { Fruit } from 'src/fruits/entities/fruit.entity';
import { FruitsService } from 'src/fruits/fruits.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reap, Farmer, Customer, Field, Fruit])],
  controllers: [ReapsController],
  providers: [
    ReapsService,
    FarmersService,
    CustomersService,
    FieldsService,
    FruitsService,
  ],
})
export class ReapsModule {}
