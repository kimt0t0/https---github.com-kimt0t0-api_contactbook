import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitCardDto } from './create-visit-card.dto';

export class UpdateVisitCardDto extends PartialType(CreateVisitCardDto) {}
