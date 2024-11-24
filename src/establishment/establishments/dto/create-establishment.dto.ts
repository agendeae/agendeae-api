import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateEstablishmentDto {
  @IsString()
  name: string
  @IsOptional()
  @IsString()
  identification?: string
  @IsOptional()
  @IsString()
  shortDescription?: string
  @IsOptional()
  @IsString()
  description?: string
  @IsOptional()
  @IsString()
  image?: string
  @IsOptional()
  @IsNumber()
  averagePrice?: number
  @IsOptional()
  @IsString()
  type?: string
  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  country?: string
  @IsOptional()
  @IsString()
  state?: string
  @IsOptional()
  @IsString()
  city?: string
  @IsOptional()
  @IsString()
  neighborhood?: string
  @IsOptional()
  @IsString()
  zipCode?: string
  @IsOptional()
  @IsString()
  address?: string
  @IsOptional()
  @IsNumber()
  latitude?: number
  @IsOptional()
  @IsNumber()
  longitude?: number

  @IsOptional()
  @IsString()
  phone?: string
  @IsOptional()
  @IsString()
  email?: string
  @IsOptional()
  @IsString()
  website?: string
}
