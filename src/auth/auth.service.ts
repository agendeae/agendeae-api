
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwtService: JwtService
  ) {}


  async signIn(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({where: {email}})
    if (user?.password !== password) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, email: user.email }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }
}
