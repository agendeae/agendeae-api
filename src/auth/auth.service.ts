import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { email } })
    if (!user) {
      throw new UnauthorizedException()
    }
    if (!bcrypt.compareSync(password, user?.password)) {
      throw new UnauthorizedException()
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    }
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    }
  }

  async register(registerDto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: registerDto.password,
        isActive: true,
        isVerified: false,
        role: 'USER',
      },
    })
    return user
  }

  async getProfile(userId: string) {
    const profile = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!profile) {
      throw new UnauthorizedException()
    }
    return profile
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    // Update email
    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: updateProfileDto.email },
      })
      if (emailExists) {
        throw new ConflictException('Email already exists')
      }
    }

    // Update password
    let password: string | undefined
    if (updateProfileDto.password) {
      if (!updateProfileDto.oldPassword) {
        throw new BadRequestException('Old password is required')
      }
      if (!bcrypt.compareSync(updateProfileDto.oldPassword, user.password)) {
        throw new UnauthorizedException('Old password is incorrect')
      }

      password = await bcrypt.hash(updateProfileDto.password, 10)
    }

    // Update user
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: updateProfileDto.name,
        email: updateProfileDto.email,
        password,
      },
    })

    return updatedUser
  }
}
