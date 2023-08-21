import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SigninAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signin(signinAuthDto: SigninAuthDto) {
    const {
      username,
      password
    } = signinAuthDto;
    if (!username) throw new NotAcceptableException ('You must enter a username to authenticate');
    if (!password) throw new NotAcceptableException ('You must enter a password to authenticate');

    const user = await this.userRepository.findOneBy({ username });

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

    return user;
  }

}
