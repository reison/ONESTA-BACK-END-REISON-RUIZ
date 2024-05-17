import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateReapDto } from './dto/create-reap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reap } from './entities/reap.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReapsService {
  private readonly logger = new Logger(ReapsService.name);
  constructor(
    @InjectRepository(Reap)
    private reapRepository: Repository<Reap>,
  ) {}

  /**
   *
   * @param CreateReapDto
   * @returns Reap
   */
  async create(createReapDto: CreateReapDto) {
    const success_message = 'Reap created successfully!';
    const error_message = 'Reap created Error!';
    try {
      const reap = await this.reapRepository.save(createReapDto);
      this.logger.log(`${success_message} ${JSON.stringify(reap)}`);
      return `${success_message} with id ${reap.id}`;
    } catch (e) {
      this.logger.error(`${error_message} ${JSON.stringify(e.message)}`);
      throw new BadRequestException(error_message);
    }
  }
}
