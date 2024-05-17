import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Email del cliente',
    required: true,
    example: 'juan.perez@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'El email del cliente es requerido' })
  email: string;

  @ApiProperty({
    description: 'Nombre del cliente',
    required: true,
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del cliente es requerido' })
  name: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    required: true,
    example: 'Ruiz',
  })
  @IsString()
  @IsNotEmpty({ message: 'El apellido del cliente es requerido' })
  lastName: string;
}
