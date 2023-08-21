import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitCardDto } from './dto/create-visit-card.dto';
import { UpdateVisitCardDto } from './dto/update-visit-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitCard } from './entities/visit-card.entity';
import { User } from '../users/entities/user.entity';
import { Group } from '../groups/entities/group.entity';

@Injectable()
export class VisitCardsService {
  constructor(
    @InjectRepository(VisitCard)
    private cardRepository: Repository<VisitCard>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}
  
  async create(createVisitCardDto: CreateVisitCardDto) {
    // destructure data
    const {
      first_name,
      last_name,
      gender,
      phone,
      address,
      ownerId,
      groupsIds
    } = createVisitCardDto
    // check if owner exists - if so load data else throw exception
    const owner = await this.userRepository.findOneBy({id: ownerId});
    if (ownerId && !owner) throw new NotFoundException(
      `User with id ${ownerId} was not found.`
    );
    // check if groups exist - if so load data else throw exception
    const groups: Group[] = [];
    if (groupsIds) {
      for (const groupId of groupsIds) {
        const group = await this.groupRepository.findOneBy({ id: groupId });
        if (!group) throw new NotFoundException(
          `Group with id ${groupId} was not found.`
        );
        groups.push(group);
      }
    }
    // gather data
    const visitCard = {
      first_name,
      last_name,
      gender,
      phone,
      address,
      owner,
      groups
    }
    return this.cardRepository.save(visitCard);
  }

  findAll() {
    return this.cardRepository.find();
  }

  // findOne(id: string) {
  //   return this.cardRepository.findOneBy({id});
  // }

  findByName(name: string) {
    return this.cardRepository.findOneBy({ last_name: name});
  }

  async update(id: string, updateVisitCardDto: UpdateVisitCardDto) {
    // destructure data
    const {
      first_name,
      last_name,
      gender,
      phone,
      address,
      ownerId,
      groupsIds
    } = updateVisitCardDto
    // load previous data
    const card = await this.cardRepository.findOneBy({id});
    if (!card) throw new NotFoundException(
      `Visit card with id ${id} was not found.`
    )
    // const owner = card.owner;
    // check if owner exists - if so load data else throw exception
    const owner = await this.userRepository.findOneBy({id: ownerId});
    if (ownerId && !owner) throw new NotFoundException(
      `User with id ${ownerId} was not found.`
    );
    // check if groups exist - if so load data else throw exception
    const groups: Group[] = [];
    if (groupsIds) {
      for (const groupId of groupsIds) {
        const group = await this.groupRepository.findOneBy({ id: groupId });
        if (!group) throw new NotFoundException(
          `Group with id ${groupId} was not found.`
        );
        groups.push(group);
      }
    }
    // gather data
    const visitCard = {
      first_name,
      last_name,
      gender,
      phone,
      address,
      owner,
      groups
    }
    return this.cardRepository.save({
      id,
      ... visitCard
    });
  }

  async remove(id: string) {
    const deletedCard = await this.cardRepository.findOneBy({ id });
    if (!deletedCard) throw new NotFoundException(
      `Visit card with id ${id} was not found.`
    )
    await this.cardRepository.delete(id);
    return deletedCard;
  }
}
