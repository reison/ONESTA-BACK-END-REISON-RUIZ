import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ReapsService } from './reaps.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FarmersService } from '../farmers/farmers.service';
import { CustomersService } from '../customers/customers.service';
import { FieldsService } from '../fields/fields.service';
import { FruitsService } from '../fruits/fruits.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('reaps')
@Controller('reaps')
export class ReapsController {
  constructor(
    private readonly reapsService: ReapsService,
    private readonly farmerService: FarmersService,
    private readonly customersService: CustomersService,
    private readonly fieldsService: FieldsService,
    private readonly fruitsService: FruitsService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const dataToProcess = [];
    const dataIn = file.buffer.toString().split('\n');

    for (const iterator of dataIn) {
      const detail = iterator.toString().split(';');
      dataToProcess.push({
        mail_agricultor: detail[0],
        nombre_agricultor: detail[1],
        apellido_agricultor: detail[2],
        mail_cliente: detail[3],
        nombre_cliente: detail[4],
        apellido_cliente: detail[5],
        nombre_campo: detail[6],
        ubicacion_campo: detail[7],
        fruta_cosechada: detail[8],
        variedad_cosechada: detail[9],
      });
    }

    dataToProcess.shift();

    for (const detail of dataToProcess) {
      let farmerId;
      let customerId;
      let fruitId;

      // farmer
      const farmer = await this.farmerService.findFarmerByEmail(
        detail.mail_agricultor,
      );

      if (!farmer) {
        const farmerResult = await this.farmerService.create({
          email: detail.mail_agricultor,
          name: detail.nombre_agricultor,
          lastName: detail.apellido_agricultor,
        });
        farmerId = farmerResult.id;
      } else {
        farmerId = farmer.id;
      }

      // customer
      const customer = await this.customersService.findCustomerByEmail(
        detail.mail_cliente,
      );

      if (!customer) {
        const customerResult = await this.customersService.create({
          email: detail.mail_cliente,
          name: detail.nombre_cliente,
          lastName: detail.apellido_cliente,
        });
        customerId = customerResult.id;
      } else {
        customerId = customer.id;
      }

      // field
      const field = await this.fieldsService.findFieldByNameAndLocation(
        detail.nombre_campo,
        detail.ubicacion_campo,
      );

      if (!field) {
        await this.fieldsService.create({
          name: detail.nombre_campo,
          location: detail.ubicacion_campo,
        });
      }

      // fruit
      const fruit = await this.fruitsService.findFruitByNameAndVariety(
        detail.fruta_cosechada,
        detail.variedad_cosechada,
      );

      if (!fruit) {
        const fruitResult = await this.fruitsService.create({
          name: detail.fruta_cosechada,
          variety: detail.variedad_cosechada,
        });
        fruitId = fruitResult.id;
      } else {
        fruitId = fruit.id;
      }

      await this.reapsService.create({
        farmerId,
        customerId,
        fieldName: detail.nombre_campo,
        fieldLocation: detail.ubicacion_campo,
        fruitId,
      });
    }
  }
}
