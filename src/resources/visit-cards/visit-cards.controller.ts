import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitCardsService } from './visit-cards.service';
import { CreateVisitCardDto } from './dto/create-visit-card.dto';
import { UpdateVisitCardDto } from './dto/update-visit-card.dto';

@Controller('visit-cards')
export class VisitCardsController {
  constructor(private readonly visitCardsService: VisitCardsService) {}

  @Post()
  create(@Body() createVisitCardDto: CreateVisitCardDto) {
    return this.visitCardsService.create(createVisitCardDto);
  }

  @Get()
  findAll() {
    return this.visitCardsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.visitCardsService.findOne(id);
  // }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.visitCardsService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitCardDto: UpdateVisitCardDto) {
    return this.visitCardsService.update(id, updateVisitCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitCardsService.remove(id);
  }
}
