import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { UserNotValidException } from '../utils/custom.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        try {
            const user = await this.userService.findByUsername(username);
            if (user && user.password === password) {
                return user;
            }
            throw new UserNotValidException('Invalid username or password');
        } catch (error) {
            if (error instanceof UserNotValidException) {
                throw error
            }
            throw new HttpException('Something went wrong: ', error.message)
        }
    }

    async login(user: User): Promise<{ accessToken: string }> {
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async verifyToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
