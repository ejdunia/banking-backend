import {
  Body,
  Req,
  Res,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}
  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    console.log('using the auth register route');
    return this.authService.register(registrationData);
  }
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }
}
