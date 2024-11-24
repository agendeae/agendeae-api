import { Controller, Get, Param, Query } from '@nestjs/common'
import { EstablishmentsService } from './establishments.service'

@Controller('public/establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    return this.establishmentsService.findAll(search, +page || 1, +limit || 10)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(id)
  }
}
