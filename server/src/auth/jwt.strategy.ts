import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    // decoding
    validate(payload: JwtPayload): Pick<User, 'id' | 'name'> {
        return {
            id: payload.sub,
            name: payload.name
        }
    }
}