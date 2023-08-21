import { Role } from "../enums/Role.enum";

export class CreateUserDto {
    username: string;
    password: string;
    role?: Role;
}
