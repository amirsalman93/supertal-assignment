import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserCredentials } from 'src/user/models/user-credentials.model';
import { AccessToken } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { BcryptHasher } from './utils';

export class JwtPayload {
    name: string;
    sub: string;
}

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(userCredentals: UserCredentials): Promise<Partial<User>> {
        const user = await this.userService.findByUsername(userCredentals.username);

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
