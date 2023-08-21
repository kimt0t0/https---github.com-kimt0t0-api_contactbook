import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/Role.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70 })
    username: string;

    @Column({ length: 150 })
    password: string;

    @Column({ 
        type: 'enum',
        enum: Role,
        default: Role.GHOST
    })
    role: Role;
}