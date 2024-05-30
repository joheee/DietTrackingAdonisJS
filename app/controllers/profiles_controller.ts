import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async profile({ view, session }: HttpContext) {
    const user = session.get('user')
    return view.render('pages/profile/profile', { user })
  }

  async edit({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}
}
