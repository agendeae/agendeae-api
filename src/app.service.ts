import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return { message: 'Olá Mundo! Pera aí... O que você está fazendo aqui??' }
  }
}
