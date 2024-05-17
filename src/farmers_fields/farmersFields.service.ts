import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFarmerFieldDto } from './dto/create-farmer-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FarmerField } from './entities/farmer-field.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmersFieldsService {
  private readonly logger = new Logger(FarmersFieldsService.name);
  constructor(
    @InjectRepository(FarmerField)
    private farmerFieldRepository: Repository<FarmerField>,
  ) {}

  /**
   *
   * @param createFieldDto
   * @returns string
   */
  async create(createFarmerFieldDto: CreateFarmerFieldDto): Promise<string> {
    const success_message = 'Farmer Field created successfully!';
    const error_message = 'Farmer Field created Error!';
    try {
      const farmerField =
        await this.farmerFieldRepository.save(createFarmerFieldDto);
      this.logger.log(`${success_message} ${JSON.stringify(farmerField)}`);
      return `${success_message}`;
    } catch (e) {
      this.logger.error(`${error_message} ${JSON.stringify(e.message)}`);
      throw new BadRequestException(error_message);
    }
  }

  /**
   *
   * @param id
   * @returns FarmerField
   */
  async findFarmerFieldById(farmerId: number, fieldId: number) {
    return await this.farmerFieldRepository.findOneBy({ farmerId, fieldId });
  }
}
