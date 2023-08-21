import { User } from 'src/resources/users/entities/user.entity';
import { VisitCard } from 'src/resources/visit-cards/entities/visit-card.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Group {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70 })
    name: string;

    @OneToMany(() => User, (user) => user.groups, {
        cascade: true
    })
    owner: User;

    @ManyToMany(() => VisitCard, (visitcard) => visitcard.groups, {
        eager: true,
        cascade: true,
        nullable: true
    })
    @JoinTable({name: "groups_visitcards"})
    visitcards: VisitCard[];
}
