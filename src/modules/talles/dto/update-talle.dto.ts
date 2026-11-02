import { PartialType } from '@nestjs/mapped-types';
import { CreateTalleDto } from './create-talle.dto.js';

export class UpdateTalleDto extends PartialType(CreateTalleDto) {}
