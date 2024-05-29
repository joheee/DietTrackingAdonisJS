import { loginValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * return page login
   */
  async login({ view }: HttpContext) {
    return view.render('pages/login/login')
  }
  /**
   * return page register
   */
  async register({ view }: HttpContext) {
    return view.render('pages/register/register')
  }

  async handleLogin({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(loginValidator)
    try {
      await auth.use('web').attempt(data.email, data.password)
      return response.redirect('/dashboard') // Redirect to a desired page after login
    } catch (error) {
      session.flash('errors', 'Invalid credentials')
      return response.redirect('back')
    }
  }
}
