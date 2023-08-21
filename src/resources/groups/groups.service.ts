import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '../users/entities/user.entity';
import { VisitCard } from '../visit-cards/entities/visit-card.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(VisitCard)
    private cardRepository: Repository<VisitCard>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    // destructure data
    const {
      name,
      ownerId,
      cardsIds
    } = createGroupDto;
    // fetch owner, if no owner throw exception
    if (!ownerId) throw new NotAcceptableException(
      `Each group must have an owner.`
    )
    const owner = await this.userRepository.findOneBy({ id: ownerId })
    if (!owner) throw new NotFoundException (
      `User with id ${ownerId} was not found.`
    )
    // fetch visit cards, if one is not found throw exception
    const visitcards: VisitCard[] = [];
    for (const cardId of cardsIds) {
      const card = await this.cardRepository.findOneBy({ id: cardId });
      if (!card) throw new NotFoundException(
        `Visit card with id ${cardId} was not found.`
      )
      visitcards.push(card)
    }
    // gather data and save
    const group = {
      name,
      owner,
      visitcards
    }
    return this.groupRepository.save(group);
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: string) {
    return this.groupRepository.findOneBy({id});
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
     // destructure data
    const {
      name,
      ownerId,
      cardsIds
    } = updateGroupDto;
    // fetch previous data
    const group = await this.groupRepository.findOneBy({ id });
    if (!group) throw new NotFoundException(
      `Group with id ${id} was not found.`
    )
    // fetch owner, if no owner throw exception
    if (!ownerId) throw new NotAcceptableException(
      `Each group must have an owner.`
    )
    const owner = await this.userRepository.findOneBy({ id: ownerId })
    if (!owner) throw new NotFoundException (
      `User with id ${ownerId} was not found.`
    )
    // fetch visit cards, if one is not found throw exception
    const visitcards: VisitCard[] = [];
    for (const cardId of cardsIds) {
      const card = await this.cardRepository.findOneBy({ id: cardId });
      if (!card) throw new NotFoundException(
        `Visit card with id ${cardId} was not found.`
      )
      visitcards.push(card)
    }
    // gather data and save
    const updatedGroup = {
      name,
      owner,
      visitcards
    }
    return await this.groupRepository.save({
      id,
      ...updatedGroup
    });
  }

  async remove(id: string) {
    const deletedGroup = await this.groupRepository.findOneBy({id});
    if (!deletedGroup) throw new NotFoundException(
      `Group with id ${id} was not found.`
    )
    this.groupRepository.delete(id);
    return deletedGroup
  }
}
