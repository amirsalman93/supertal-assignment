import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from 'src/users/entities/user-credentials.entity';
import { User } from 'src/users/entities/user.entity';
import { AccessToken } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { BcryptHasher } from './utils';

export class JwtPayload {
    name: string;
    sub: string;
}

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(userCredentals: UserCredentials): Promise<Partial<User>> {
        const user = await this.usersService.findByUsername(userCredentals.username);

        if (user && userCredentals.password && BcryptHasher.comparePassword(userCredentals.password, user.password)) {
            // authenticated
            return user;
        }
        // user not found or invalid password
        throw new UnauthorizedException('Login Failed. Invalid username or password!');
    }

    login(user: User): AccessToken {
        const payload: JwtPayload = {
            name: user.name,
            sub: user.id
        }
        return {
            access_token: this.jwtService.sign(payload, { privateKey: process.env.JWT_SECRET }),
            user: user
        }
    }
}
