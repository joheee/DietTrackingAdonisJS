import User from '#models/user'
import { updateProfileValidator } from '#validators/profile'
import { cuid } from '@adonisjs/core/helpers'
import { Redirect, type HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ProfilesController {
  async profile({ view, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.redirect().toRoute('page.login')
    }
    return view.render('pages/profile/profile', { user })
  }

  async edit({ view, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.redirect().toRoute('page.login')
    }
    return view.render('pages/editprofile/editprofile', { user })
  }

  async handleEdit({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(updateProfileValidator)
    try {
      const user = session.get('user')

      let pic = data.picture
      await pic.move(app.makePath('public/assets/picture'), {
        name: `${cuid()}.${pic.extname}`,
      })

      const updateUser = await User.find(user.id)
      updateUser!.name = data.name
      user.name = data.name
      updateUser!.picture = pic.fileName!
      updateUser?.save()

      session.put('user', {
        id: updateUser!.id,
        email: updateUser!.email,
        name: updateUser!.name,
        picture: updateUser!.picture,
      })
      return response.redirect().toRoute('page.profile')
    } catch (error) {
      session.flash('errors.picture', 'Invalid update profile')
      return response.redirect('back')
    }
  }
}
