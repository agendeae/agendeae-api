import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { Request } from 'express'
import { Public } from 'src/shared/decorators/public.decorator'
import { plainToInstance } from 'class-transformer'
import { ProfileEntity } from './entities/profile.entity'
import { RegisterDto } from './dto/register.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const { accessToken, user } = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    )
    return { accessToken, user: plainToInstance(ProfileEntity, user) }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const profile = await this.authService.getProfile(req.user.userId)
    return plainToInstance(ProfileEntity, profile)
  }

  @Patch('profile')
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: Request
  ) {
    return this.authService.updateProfile(req.user.userId, updateProfileDto)
  }
}
