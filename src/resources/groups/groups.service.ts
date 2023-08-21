import { Injectable, NotFoundException } from '@nestjs/common';
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
    private groupRespository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(VisitCard)
    private cardRepository: Repository<VisitCard>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.groupRespository.save(createGroupDto);
  }

  findAll() {
    return this.groupRespository.find();
  }

  findOne(id: string) {
    return this.groupRespository.findOneBy({id});
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupRespository.save({
      id,
      ...updateGroupDto
    });
  }

  async remove(id: string) {
    const deletedGroup = await this.groupRespository.findOneBy({id});
    if (!deletedGroup) throw new NotFoundException(
      `Group with id ${id} was not found.`
    )
    this.groupRespository.delete(id);
    return deletedGroup
  }
}
