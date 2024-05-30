import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'aaaa@gmail.com',
        password: 'aaaa',
        name: 'aaaa',
        picture: 'home-tool.png',
      },
      {
        email:'bbbb@gmail.com',
        password:'bbbb',
        name: 'bbbb',
        picture: 'home-tool.png',
      }
    ])
  }
}
