import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class AuthController {
  async login({ view, session, response }: HttpContext) {
    const user = session.get('user')
    if (user) {
      return response.redirect().toRoute('page.landing')
    }
    return view.render('pages/login/login', { user })
  }
  async register({ view, session, response }: HttpContext) {
    const user = session.get('user')
    if (user) {
      return response.redirect().toRoute('page.landing')
    }
    return view.render('pages/register/register', { user })
  }

  async logout({ view, session }: HttpContext) {
    session.forget('user')
    return view.render('pages/login/login')
  }

  async handleLogin({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(data.email, data.password)
      if (user) {
        session.put('user', {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
        })
        return response.redirect().toRoute('page.landing')
      }
      response.abort('Invalid credentials')
      session.flash('errors.password', 'Invalid credentials')
      return response.redirect('back')
    } catch (error) {
      session.flash('errors.password', 'Invalid credentials')
      return response.redirect('back')
    }
  }

  async handleRegister({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    try {
      let pic = data.picture
      await pic.move(app.makePath('public/assets/picture'), {
        name: `${cuid()}.${pic.extname}`,
      })

      const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        picture: pic.fileName!,
      })
      session.put('user', {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      })
      return response.redirect().toRoute('page.landing')
    } catch (error) {
      session.flash('errors.confirm_password', 'Abort register')
      return response.redirect('back')
    }
  }
}
