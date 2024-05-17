import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFarmerFieldDto {
  @ApiProperty({
    description: 'Id del granjero',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El id del granjero es requerido' })
  farmerId: number;

  @ApiProperty({
    description: 'Id del campo',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El id del campo es requerido' })
  fieldId: number;
}
