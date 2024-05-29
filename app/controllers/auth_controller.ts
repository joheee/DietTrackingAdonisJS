import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ view }: HttpContext) {
    return view.render('pages/login/login')
  }
  async register({ view }: HttpContext) {
    return view.render('pages/register/register')
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
    console.log('test')
    const data = await request.validateUsing(registerValidator)
    try {
      session.flash('errors.password', 'Abort register')
      return response.redirect('back')
    } catch (error) {
      session.flash('errors.password', 'Abort register')
      return response.redirect('back')
    }
  }
}
