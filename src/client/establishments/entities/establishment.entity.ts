import { Establishment } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class EstablishmentEntity implements Establishment {
  id: string
  identification: string
  name: string
  shortDescription: string
  description: string
  image: string
  averagePrice: number
  type: string
  category: string

  isVerified: boolean
  isActive: boolean

  country: string
  state: string
  city: string
  neighborhood: string
  zipCode: string
  address: string
  latitude: number
  longitude: number

  phone: string
  email: string
  website: string

  @Exclude()
  adminId: string

  createdAt: Date
  updatedAt: Date
}
