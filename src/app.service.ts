import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá Mundo! Pera aí... O que você está fazendo aqui??'
  }
}
