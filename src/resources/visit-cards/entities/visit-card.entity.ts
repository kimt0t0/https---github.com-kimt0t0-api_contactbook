import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { Gender } from "../enums/Gender.enum";
import { User } from "src/resources/users/entities/user.entity";
import { Group } from "src/resources/groups/entities/group.entity";

@Entity('visit-cards')
export class VisitCard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70})
    first_name: string;

    @Column({ length: 70})
    last_name: string;

    @Column({ 
        type: 'enum',
        enum: Gender,
        default: Gender.N
    })
    gender: Gender;

    @Column({ length: 10})
    phone: string;

    @Column({ length: 256 })
    address: string;

    @ManyToOne(() => User, (user) => user.visitcards, {
        cascade: true
    })
    owner: User;

    @ManyToMany(() => Group, (group) => group.visitcards, {
        cascade: ['insert', 'update'],
        nullable: true
    })
    groups: Group[];
}
