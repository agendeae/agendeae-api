import { Controller, Get, Param, Query } from '@nestjs/common'
import { EstablishmentsService } from './establishments.service'
import { plainToInstance } from 'class-transformer'
import { EstablishmentEntity } from './entities/establishment.entity'

@Controller('public/establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    const establishments = await this.establishmentsService.findAll(
      search,
      +page || 1,
      +limit || 10
    )

    return plainToInstance(EstablishmentEntity, establishments)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const establishment = await this.establishmentsService.findOne(id)

    return plainToInstance(EstablishmentEntity, establishment)
  }
}
