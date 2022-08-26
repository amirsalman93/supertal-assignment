import { ApiProperty } from "@nestjs/swagger";

export class Artist {
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ type: 'text', isArray: true })
    genres?: string[];

    @ApiProperty()
    activeSince: number;
}