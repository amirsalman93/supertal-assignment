import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptHasher, generateRandomId } from 'src/auth/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

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
    private users: User[] = seedUsers.map(u => ({ id: generateRandomId(), ...u }));

    constructor(
        // @Inject('USER_REPOSITORY')
        // private userRepository: Repository<User>,
    ) {
        // this.userRepository.save(seedUsers);
    }

    async findByUsername(username: string): Promise<User> {
        return this.users.find(user => user.username === username);
        // return await this.userRepository.findOneBy({ username: username });
    }

    async getUserById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
        // return this.userRepository.findOneBy({ id: id });
    }

    async getAllUsers() {
        return this.users;
        // return await this.userRepository.find();
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        let exists = await this.findByUsername(createUserDto.username);

        if (exists) {
            throw new ConflictException("User already exists with the same username. Please choose a different username");
        }

        // hashing the pssword
        createUserDto.password = BcryptHasher.hashPassword(createUserDto.password);

        let newUser: User = {
            id: generateRandomId(),
            ...createUserDto
        };
        this.users.push(newUser);
        // this.userRepository.save(newUser);
        return newUser;
    }

    updateUserById(id: string, updateUserDto: CreateUserDto) {
        // todo:         
    }
}
