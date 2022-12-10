import {IsString, Matches} from 'class-validator';

export class Environment {

    @Matches(/^\d{12}$/)
    ACCOUNT_ID!: `${number}`;

    @IsString()
    REGION!: string;

}
