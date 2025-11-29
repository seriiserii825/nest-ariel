import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { ISignInResponse } from './interfaces/sign-in-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<ISignInResponse | null> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/users')
  async getAllUsers(): Promise<UserEntity[]> {
    return this.authService.getAllUsers();
  }

  @Delete('/user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.authService.deleteUser(id);
  }
}
