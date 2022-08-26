import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    createdAt?: Date;
    updatedAt?: Date;
}