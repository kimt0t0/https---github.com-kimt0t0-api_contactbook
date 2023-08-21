import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Gender } from "../enums/Gender.enum";

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
}
