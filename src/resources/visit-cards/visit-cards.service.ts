import { Injectable } from '@nestjs/common';
import { CreateVisitCardDto } from './dto/create-visit-card.dto';
import { UpdateVisitCardDto } from './dto/update-visit-card.dto';

@Injectable()
export class VisitCardsService {
  create(createVisitCardDto: CreateVisitCardDto) {
    return 'This action adds a new visitCard';
  }

  findAll() {
    return `This action returns all visitCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitCard`;
  }

  update(id: number, updateVisitCardDto: UpdateVisitCardDto) {
    return `This action updates a #${id} visitCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitCard`;
  }
}
