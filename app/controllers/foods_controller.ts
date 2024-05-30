import type { HttpContext } from '@adonisjs/core/http'

export default class FoodsController {
  /**
   * view to food page
   */
  async landing({ view, session }: HttpContext) {
    const user = session.get('user')
    return view.render('pages/landing/landing', {user})
  }

  /**
   * view to food page
   */
  async food({ view, session }: HttpContext) {
    const user = session.get('user')
    return view.render('pages/foods/foods', {user})
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
