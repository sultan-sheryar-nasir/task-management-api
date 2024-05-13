import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../utils/constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Public()
    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        const user = await this.authService.validateUser(username, password);
        return this.authService.login(user);
    }

    @Public()
    @Post('register')
    async register(@Body('username') username: string, @Body('email') email: string, @Body('password') password: string) {
        const existingUser = await this.userService.findByUsername(username);
        if (existingUser) {
            return { message: 'Username is already taken' };
        }
        const newUser = await this.userService.createUser(username, email, password);
        return this.authService.login(newUser);
    }
    @Post('verify-token')
    async verifyToken(@Body('token') token: string) {
        return this.authService.verifyToken(token);
    }
}
