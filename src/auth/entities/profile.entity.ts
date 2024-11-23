import { User, UserRole } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class ProfileEntity implements User {
  id: string
  email: string
  role: UserRole
  name: string
  avatar: string
  isActive: boolean
  isVerified: boolean

  @Exclude()
  password: string

  createdAt: Date
  updatedAt: Date
}
