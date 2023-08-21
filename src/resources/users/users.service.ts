import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { VisitCard } from '../visit-cards/entities/visit-card.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(VisitCard)
    private cardRepository: Repository<VisitCard>
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // destructure data
    const {
      username,
      role,
      groupsIds,
      cardsIds
    } = updateUserDto;
    // fetch groups, if one doesn't exist throw exception
    const groups: Group[] = [];
    for (const groupId of groupsIds) {
      const group = await this.groupRepository.findOneBy({ id: groupId });
      if (!group) throw new NotFoundException(
        `Group with id ${groupId} was not found.`
      )
      groups.push(group);
    }
    // fetch contact-cards, if one doesn't exist throw exception
    const visitcards: VisitCard[] = [];
    for (const cardId of cardsIds) {
      const card = await this.cardRepository.findOneBy({ id: cardId });
      if (!card) throw new NotFoundException(
        `Visit card with id ${cardId} was not found.`
      )
      visitcards.push(card);
    }
    // gather data and save
    const user = {
      username,
      role,
      groups,
      visitcards
    }
    return this.userRepository.save({
      id,
      ...user
    });
  }

  async remove(id: string) {
    const deletedUser = await this.userRepository.findOneBy({id});
    if (!deletedUser) throw new NotFoundException(
      `User with id ${id} was not found.`
    )
    this.userRepository.delete(id);
    return deletedUser;
  }
}
