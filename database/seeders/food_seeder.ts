import Food from '#models/food'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Food.createMany([
      {
        name: 'food 1',
        picture: 'food1.jpg',
        description: 'food 1',
      },
      {
        name: 'food 2',
        picture: 'food2.jpg',
        description: 'food 2',
      },
    ])
  }
}
