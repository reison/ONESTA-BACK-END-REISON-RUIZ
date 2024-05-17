import { Controller, Post, Body } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('farmers')
@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @ApiResponse({
    status: 200,
    description: 'Farmer created successfully with id 1',
    type: CreateFarmerDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Farmer created Error!',
  })
  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmersService.create(createFarmerDto);
  }
}
