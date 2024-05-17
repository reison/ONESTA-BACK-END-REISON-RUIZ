import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from './entities/fruit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FruitsService {
  private readonly logger = new Logger(FruitsService.name);
  constructor(
    @InjectRepository(Fruit)
    private fruitRepository: Repository<Fruit>,
  ) {}

  /**
   *
   * @param createFruitDto
   * @returns string
   */
  async create(createFruitDto: CreateFruitDto): Promise<Fruit> {
    const success_message = 'Fruit created successfully!';
    const error_message = 'Fruit created Error!';
    try {
      const checkFruit = await this.findFruitByNameAndVariety(
        createFruitDto.name,
        createFruitDto.variety,
      );
      if (checkFruit) {
        this.logger.error(`${error_message}`);
        return;
      }
      const fruit = await this.fruitRepository.save(createFruitDto);
      this.logger.log(`${success_message} ${JSON.stringify(fruit)}`);
      return fruit;
    } catch (e) {
      this.logger.error(`${error_message} ${JSON.stringify(e.message)}`);
      throw new BadRequestException(error_message);
    }
  }

  /**
   *
   * @param name
   * @param variety
   * @returns Fruit
   */
  async findFruitByNameAndVariety(name: string, variety: string) {
    return await this.fruitRepository.findOneBy({ name, variety });
  }
}
