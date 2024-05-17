import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FruitsModule } from './fruits/fruits.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { FarmersModule } from './farmers/farmers.module';
import { FieldsModule } from './fields/fields.module';
import { FarmersFieldsModule } from './farmers_fields/farmersFields.module';
import { CustomersModule } from './customers/customers.module';
import { ReapsModule } from './reaps/reaps.module';

@Module({
  imports: [
    FruitsModule,
    FarmersModule,
    FieldsModule,
    FarmersFieldsModule,
    CustomersModule,
    ReapsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      dropSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
