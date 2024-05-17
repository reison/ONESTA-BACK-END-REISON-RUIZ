import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateFarmerDto {
  @ApiProperty({
    description: 'Email del agricultor',
    required: true,
    example: 'juan.perez@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'El email del agricultor es requerido' })
  email: string;

  @ApiProperty({
    description: 'Nombre del agricultor',
    required: true,
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del agricultor es requerido' })
  name: string;

  @ApiProperty({
    description: 'Apellido del agricultor',
    required: true,
    example: 'Ruiz',
  })
  @IsString()
  @IsNotEmpty({ message: 'El apellido del agricultor es requerido' })
  lastName: string;
}
