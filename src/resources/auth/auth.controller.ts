import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: SigninAuthDto) {
    return this.authService.signin(createAuthDto);
  }

}
