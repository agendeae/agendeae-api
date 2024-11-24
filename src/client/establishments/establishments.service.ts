import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'

@Injectable()
export class EstablishmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(search: string, page: number, limit: number) {
    const establishments = await this.prisma.establishment.findMany({
      where: {
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
        isActive: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return establishments
  }

  async findOne(id: string) {
    const establishment = await this.prisma.establishment.findUnique({
      where: { id },
    })

    return establishment
  }
}
