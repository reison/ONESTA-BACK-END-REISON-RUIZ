import { Controller, Post, Body } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @ApiResponse({
    status: 200,
    description: 'Field created successfully!',
    type: CreateFieldDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Field created Error!',
  })
  @Post()
  async create(@Body() createFieldDto: CreateFieldDto) {
    return await this.fieldsService.create(createFieldDto);
  }
}
