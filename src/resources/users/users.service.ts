import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../groups/entities/group.entity';
import { VisitCard } from '../visit-cards/entities/visit-card.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({
      id,
      ...updateUserDto
    });
  }

  async remove(id: string) {
    const deletedUser = await this.userRepository.findOneBy({id});
    this.userRepository.delete(id);
    return deletedUser;
  }
}
