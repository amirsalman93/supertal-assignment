import { ConflictException, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { BcryptHasher, generateRandomId } from 'src/auth/utils';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

const seedUsers: CreateUserDto[] = [
    {
        name: "admin",
        username: 'admin',
        password: BcryptHasher.hashPassword('admin')
    },
    {
        name: "User 1",
        username: 'user1',
        password: BcryptHasher.hashPassword('1234')
    },
    {
        name: "User 2",
        username: 'user2',
        password: BcryptHasher.hashPassword('5678')
    }
]

// todo: hash of the password should never be sent to the frontend

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        private prisma: PrismaService,
    ) {
        this.seed();
    }

    async seed() {
        for (let i = 0; i < seedUsers.length; i++) {
            try {
                let u = seedUsers[i];
                if (!await this.findByUsername(u.username)) {
                    await this.prisma.user.create({ data: u as any });
                }
            } catch (error) {
                this.logger.error(error.code, error.message);
            }
        }
    }

    async findByUsername(username: string): Promise<User> {
        let user: User | undefined = undefined;
        try {
            user = await this.prisma.user.findUnique({ where: { username } });
        } catch (error) {
            this.logger.error(error.code, error.message);
        }
        return user;
    }

    async getUserById(id: string): Promise<User> {
        let user: User | undefined = undefined;
        try {
            user = await this.prisma.user.findUnique({ where: { id } });
        } catch (error) {
            this.logger.error(error.code, error.message);
        }
        return user;
    }

    async getAllUsers() {
        let users: User[] | undefined = undefined;
        try {
            users = await this.prisma.user.findMany({});
        } catch (error) {
            this.logger.error(error.code, error.message);
        }

        return users;
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        let exists = await this.findByUsername(createUserDto.username);

        if (exists) {
            throw new ConflictException("User already exists with the same username. Please choose a different username");
        }

        // hashing the pssword
        createUserDto.password = BcryptHasher.hashPassword(createUserDto.password);

        let newUser: User = undefined;

        try {
            newUser = await this.prisma.user.create({ data: newUser })
        } catch (error) {
            this.logger.error(error.code, error.message);
        }

        return newUser;
    }

    updateUserById(id: string, updateUserDto: CreateUserDto) {
        // todo:         
    }
}
