import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'foods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 254).notNullable()
      table.string('picture', 254).notNullable()
      table.string('description', 254).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}