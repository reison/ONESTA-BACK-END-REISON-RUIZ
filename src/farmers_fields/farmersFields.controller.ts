import {
  Controller,
  Post,
  Body,
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FarmersFieldsService } from './farmersFields.service';
import { CreateFarmerFieldDto } from './dto/create-farmer-field.dto';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FarmersService } from '../farmers/farmers.service';
import { FieldsService } from '../fields/fields.service';

@ApiTags('farmersFields')
@Controller('farmersFields')
@Injectable()
export class FarmersFieldsController {
  private readonly logger = new Logger(FarmersFieldsService.name);
  constructor(
    private readonly farmersFieldsService: FarmersFieldsService,
    private readonly farmerService: FarmersService,
    private readonly fieldService: FieldsService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Farmer Field created successfully!',
    type: CreateFarmerFieldDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Farmer Field created Error!',
  })
  @Post()
  async create(@Body() createFarmerFieldDto: CreateFarmerFieldDto) {
    const farmer_error_message = `Farmer not found with id ${createFarmerFieldDto.farmerId}`;
    const field_error_message = `Field not found with id ${createFarmerFieldDto.fieldId}`;

    const farmer = await this.farmerService.findFarmerById(
      createFarmerFieldDto.farmerId,
    );

    if (!farmer) {
      this.logger.error(farmer_error_message);
      throw new BadRequestException(farmer_error_message);
    }

    const field = await this.fieldService.findFieldById(
      createFarmerFieldDto.fieldId,
    );

    if (!field) {
      this.logger.error(field_error_message);
      throw new BadRequestException(field_error_message);
    }
    return await this.farmersFieldsService.create(createFarmerFieldDto);
  }
}
