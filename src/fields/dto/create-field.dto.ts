import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({
    description: 'Nombre del campo',
    required: true,
    example: 'Gran Sabana',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del campo es requerido' })
  name: string;

  @ApiProperty({
    description: 'Ubicación del campo',
    required: true,
    example: '345 Maruri',
  })
  @IsString()
  @IsNotEmpty({ message: 'La ubicación del campo es requerida' })
  location: string;
}
