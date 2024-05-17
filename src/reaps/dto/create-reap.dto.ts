import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReapDto {
  @ApiProperty({
    description: 'Id del agricultor',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El id del agricultor es requerido' })
  farmerId: number;

  @ApiProperty({
    description: 'Id del cliente',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El id del cliente es requerido' })
  customerId: number;

  @ApiProperty({
    description: 'Nombre del campo',
    required: true,
    example: 'Sabana Grande',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del campo es requerido' })
  fieldName: string;

  @ApiProperty({
    description: 'Ubicación del campo',
    required: true,
    example: 'Carrión',
  })
  @IsString()
  @IsNotEmpty({ message: 'La ubicación del campo es requerida' })
  fieldLocation: string;

  @ApiProperty({
    description: 'fruta cosechada',
    required: true,
    example: 'banana',
  })
  @IsString()
  @IsNotEmpty({ message: 'la fruta cosechada es requerida' })
  fruitId: number;
}
