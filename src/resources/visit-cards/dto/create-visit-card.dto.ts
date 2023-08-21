import { Gender } from "../enums/Gender.enum";

export class CreateVisitCardDto {
    first_name: string;
    last_name: string;
    gender?: Gender;
    phone?: string;
    address: string;
    ownerId: string;
    groupsIds?: string;
}
