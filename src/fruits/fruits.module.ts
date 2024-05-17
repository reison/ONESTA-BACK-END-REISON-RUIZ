import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { Fruit } from './entities/fruit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fruit])],
  controllers: [FruitsController],
  providers: [FruitsService],
})
export class FruitsModule {}
