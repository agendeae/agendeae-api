import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common'
import { EstablishmentsService } from './establishments.service'
import { CreateEstablishmentDto } from './dto/create-establishment.dto'
import { UpdateEstablishmentDto } from './dto/update-establishment.dto'
import { Request } from 'express'

@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createEstablishmentDto: CreateEstablishmentDto
  ) {
    return this.establishmentsService.create(
      req.user.userId,
      createEstablishmentDto
    )
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.establishmentsService.findAll(req.user.userId)
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.establishmentsService.findOne(req.user.userId, id)
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto
  ) {
    return this.establishmentsService.update(
      req.user.userId,
      id,
      updateEstablishmentDto
    )
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.establishmentsService.remove(req.user.userId, id)
  }
}
