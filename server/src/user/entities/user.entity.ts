import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    @ApiProperty()
    name: string;

    @ApiProperty()
    @Column({ type: 'text', unique: true })
    username: string;

    @ApiProperty()
    @Column('text')
    password: string;
}