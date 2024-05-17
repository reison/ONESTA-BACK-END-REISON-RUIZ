import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmersService {
  private readonly logger = new Logger(FarmersService.name);
  constructor(
    @InjectRepository(Farmer)
    private farmerRepository: Repository<Farmer>,
  ) {}

  /**
   *
   * @param createFarmerDto
   * @returns Farmer
   */
  async create(createFarmerDto: CreateFarmerDto) {
    const success_message = 'Farmer created successfully!';
    const error_message = 'Farmer created Error!';
    try {
      const farmer = await this.farmerRepository.save(createFarmerDto);
      this.logger.log(`${success_message} ${JSON.stringify(farmer)}`);
      return farmer;
      // return `${success_message} with id ${farmer.id}`;
    } catch (e) {
      this.logger.error(`${error_message} ${JSON.stringify(e.message)}`);
      throw new BadRequestException(error_message);
    }
  }

  /**
   *
   * @param email
   * @returns Farmer
   */
  async findFarmerByEmail(email: string) {
    return await this.farmerRepository.findOneBy({ email });
  }

  /**
   *
   * @param id
   * @returns Farmer
   */
  async findFarmerById(id: number) {
    return await this.farmerRepository.findOneBy({ id });
  }
}
