import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FieldsService {
  private readonly logger = new Logger(FieldsService.name);
  constructor(
    @InjectRepository(Field)
    private fieldRepository: Repository<Field>,
  ) {}

  /**
   *
   * @param createFieldDto
   * @returns string
   */
  async create(createFieldDto: CreateFieldDto): Promise<Field> {
    const success_message = 'Field created successfully!';
    const error_message = 'Field created Error!';
    try {
      const field = await this.fieldRepository.save(createFieldDto);
      this.logger.log(`${success_message} ${JSON.stringify(field)}`);
      return field;
      // return `${success_message} with id ${field.id}`;
    } catch (e) {
      this.logger.error(`${error_message} ${JSON.stringify(e.message)}`);
      throw new BadRequestException(error_message);
    }
  }

  /**
   *
   * @param name
   * @param location
   * @returns Field
   */
  async findFieldByNameAndLocation(name: string, location: string) {
    return await this.fieldRepository.findOneBy({ name, location });
  }

  /**
   *
   * @param id
   * @returns Field
   */
  async findFieldById(id: number) {
    return await this.fieldRepository.findOneBy({ id });
  }
}
