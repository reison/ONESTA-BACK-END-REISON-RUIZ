import { Controller, Post, Body } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('fruits')
@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  @ApiResponse({
    status: 200,
    description: 'Fruit created successfully!',
    type: CreateFruitDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Fruit created Error!',
  })
  @Post()
  async create(@Body() createFruitDto: CreateFruitDto) {
    return await this.fruitsService.create(createFruitDto);
  }
}
