import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Food extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare picture: string

  @column()
  declare description: string
}
