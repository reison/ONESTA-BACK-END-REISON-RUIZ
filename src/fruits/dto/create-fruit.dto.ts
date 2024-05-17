import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFruitDto {
  @ApiProperty({
    description: 'Nombre de la fruta',
    required: true,
    example: 'Banana',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la fruta es requerido' })
  name: string;

  @ApiProperty({
    description: 'Variedad de fruta',
    required: true,
    example: 'large',
  })
  @IsString()
  @IsNotEmpty({ message: 'La variedad de la fruta es requerido' })
  variety: string;
}
