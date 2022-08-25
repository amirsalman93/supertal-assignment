import { ApiProperty } from "@nestjs/swagger";
import { UserCredentials } from "./user-credentials.entity";

export class User extends UserCredentials {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}