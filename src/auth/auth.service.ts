import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { ISignInResponse } from './interfaces/sign-in-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISignInResponse | null> {
    const username =
      await this.userRepository.validateUserPassword(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IJwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
