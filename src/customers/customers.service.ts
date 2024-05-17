import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /**
   *
   * @param createCustomerDto
   * @returns Customer
   */
  async create(createCustomerDto: CreateCustomerDto) {
    const success_message = 'Customer created successfully!';
    const error_message = 'Customer created Error!';
    try {
      const customer = await this.customerRepository.save(createCustomerDto);
      this.logger.log(`${success_message} ${JSON.stringify(customer)}`);
      return customer;
      // return `${success_message} with id ${customer.id}`;
    } catch (e) {
      this.logger.error(`${error_message} ${JSON.stringify(e.message)}`);
      throw new BadRequestException(error_message);
    }
  }

  /**
   *
   * @param email
   * @returns Customer
   */
  async findCustomerByEmail(email: string) {
    return await this.customerRepository.findOneBy({ email });
  }

  /**
   *
   * @param id
   * @returns Customer
   */
  async findCustomerById(id: number) {
    return await this.customerRepository.findOneBy({ id });
  }
}
