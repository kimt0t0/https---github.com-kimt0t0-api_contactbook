import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from '../enums/Role.enum';

export class UpdateUserDto {
    username: string;
    role?: Role;
    groupsIds: string[];
    contactCardsIds: string[];
}
