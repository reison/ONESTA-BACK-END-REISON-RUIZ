import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmersFieldsService } from './farmersFields.service';
import { FarmersService } from 'src/farmers/farmers.service';
import { FieldsService } from 'src/fields/fields.service';
import { FarmersFieldsController } from './farmersFields.controller';
import { FarmerField } from './entities/farmer-field.entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { Field } from 'src/fields/entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FarmerField, Farmer, Field])],
  controllers: [FarmersFieldsController],
  providers: [FarmersFieldsService, FarmersService, FieldsService],
})
export class FarmersFieldsModule {}
