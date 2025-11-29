import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import {UserEntity} from './user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret_key',
    });
  }
  async validate(payload: IJwtPayload): Promise<UserEntity> {
    const { username } = payload;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }
}
