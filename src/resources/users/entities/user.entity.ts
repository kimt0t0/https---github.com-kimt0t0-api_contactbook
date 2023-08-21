import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../enums/Role.enum';
import { Group } from 'src/resources/groups/entities/group.entity';
import { VisitCard } from 'src/resources/visit-cards/entities/visit-card.entity';

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

    @ManyToOne(() => Group, (group) => group.owner, {
        eager: true,
        nullable: true,
        cascade: ['insert', 'update']
    })
    groups: Group[];

    @ManyToOne(() => VisitCard, (visitcard) => visitcard.owner, {
        // eager: true,
        nullable: true,
        cascade: ['insert', 'update']
    })
    visitcards: VisitCard[];
}