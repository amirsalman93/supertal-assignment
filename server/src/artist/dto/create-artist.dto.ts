import { ApiProperty } from "@nestjs/swagger";
import { Album, Track } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { Base } from "src/base.entity";

export class CreateArtistDto extends Base {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
