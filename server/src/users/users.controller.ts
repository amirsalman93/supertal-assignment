import { Body, Controller, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

export class AccessToken {
    access_token: string;
    user: User;
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {

    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('whoami')
    @ApiOkResponse({ type: User, description: 'Logged in user info' })
    async whoAmI(@Request() req
    ): Promise<User> {
        return await this.usersService.getUserById(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({ type: User, description: 'user that matches the specified id' })
    @ApiNotFoundResponse()
    async getUser(@Param('id') id: string): Promise<User> {
        let user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: User, isArray: true, description: 'list of all users' })
    async getUsers(): Promise<User[]> {
        let users = await this.usersService.getAllUsers();
        if (!users) {
            throw new NotFoundException();
        }
        return users;
    }

    @Post()
    @ApiCreatedResponse({ type: User, description: 'newly created user' })
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.addUser({ ...createUserDto });
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiNotFoundResponse()
    @ApiOkResponse({ type: User, description: 'updated the user with the specified id' })
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: CreateUserDto
    ) {
        return await this.usersService.updateUserById(id, updateUserDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiCreatedResponse({ type: AccessToken, description: 'access token for the logged in user' })
    @ApiUnauthorizedResponse({ description: 'Login Failed. Invalid username or password!' })
    async loginUser(@Body() loginUserDto: LoginUserDto, @Request() req): Promise<AccessToken> {
        return this.authService.login(req.user);
    }
}
