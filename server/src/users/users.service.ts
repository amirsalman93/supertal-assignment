import { ConflictException, Injectable } from '@nestjs/common';
import { BcryptHasher, generateRandomId } from 'src/auth/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

// todo: hash of the password should never be sent to the frontend

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: generateRandomId(),
            name: "Amir Salman",
            username: 'amir.salman',
            password: BcryptHasher.hashPassword('12345678')
        },
        {
            id: generateRandomId(),
            name: "Atif Aslam",
            username: 'atif.aslam',
            password: BcryptHasher.hashPassword('11223344')
        }
    ]

    async findByUsername(username: string): Promise<User> {
        return this.users.find(user => user.username === username);
    }

    async getUserById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

    async getAllUsers() {
        return this.users;
    }

    async addUser(createUserDto: CreateUserDto): Promise<User> {
        let exists = this.users.find(user => user.username === createUserDto.username);

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
        return newUser;
    }

    updateUserById(id: string, updateUserDto: CreateUserDto) {
        // todo:         
    }
}
