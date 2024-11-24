import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEstablishmentDto } from './dto/create-establishment.dto'
import { UpdateEstablishmentDto } from './dto/update-establishment.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'

@Injectable()
export class EstablishmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createEstablishmentDto: CreateEstablishmentDto) {
    const establishment = await this.prismaService.establishment.create({
      data: {
        name: createEstablishmentDto.name,
        admin: { connect: { id: userId } },
        identification: createEstablishmentDto.identification,
        shortDescription: createEstablishmentDto.shortDescription,
        description: createEstablishmentDto.description,
        image: createEstablishmentDto.image,
        averagePrice: createEstablishmentDto.averagePrice,
        type: createEstablishmentDto.type,
        category: createEstablishmentDto.category,

        country: createEstablishmentDto.country,
        state: createEstablishmentDto.state,
        city: createEstablishmentDto.city,
        neighborhood: createEstablishmentDto.neighborhood,
        zipCode: createEstablishmentDto.zipCode,
        address: createEstablishmentDto.address,
        latitude: createEstablishmentDto.latitude,
        longitude: createEstablishmentDto.longitude,

        phone: createEstablishmentDto.phone,
        email: createEstablishmentDto.email,
        website: createEstablishmentDto.website,

        users: { create: { userId } },
      },
    })

    return establishment
  }

  async findAll(userId: string) {
    const establishments = await this.prismaService.establishment.findMany({
      where: { users: { some: { userId } } },
    })

    return establishments
  }

  async findOne(userId: string, id: string) {
    const establishment = await this.prismaService.establishment.findUnique({
      where: { id, users: { some: { userId } } },
    })

    if (!establishment) {
      throw new NotFoundException('Establishment not found')
    }

    return establishment
  }

  async update(
    userId: string,
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto
  ) {
    await this.findOne(userId, id)

    const establishment = await this.prismaService.establishment.update({
      where: { id, adminId: userId },
      data: {
        name: updateEstablishmentDto.name,
        identification: updateEstablishmentDto.identification,
        shortDescription: updateEstablishmentDto.shortDescription,
        description: updateEstablishmentDto.description,
        image: updateEstablishmentDto.image,
        averagePrice: updateEstablishmentDto.averagePrice,
        type: updateEstablishmentDto.type,
        category: updateEstablishmentDto.category,

        country: updateEstablishmentDto.country,
        state: updateEstablishmentDto.state,
        city: updateEstablishmentDto.city,
        neighborhood: updateEstablishmentDto.neighborhood,
        zipCode: updateEstablishmentDto.zipCode,
        address: updateEstablishmentDto.address,
        latitude: updateEstablishmentDto.latitude,
        longitude: updateEstablishmentDto.longitude,

        phone: updateEstablishmentDto.phone,
        email: updateEstablishmentDto.email,
        website: updateEstablishmentDto.website,
      },
    })

    return establishment
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id)

    await this.prismaService.establishment.delete({
      where: { id, adminId: userId },
    })
  }
}
