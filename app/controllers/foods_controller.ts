import Food from '#models/food'
import { addFoodValidator } from '#validators/food'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class FoodsController {
  async landing({ view, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.redirect().toRoute('page.login')
    }
    return view.render('pages/landing/landing', { user })
  }

  async food({ view, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.redirect().toRoute('page.login')
    }
    const foods = await Food.all()
    return view.render('pages/foods/foods', { user, foods })
  }

  async addFood({ session, view, response }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.redirect().toRoute('page.login')
    }
    return view.render('pages/addfood/addfood', { user })
  }

  async handleAddFood({ request, response, session, view }: HttpContext) {
    const data = await request.validateUsing(addFoodValidator)
    try {
      let pic = data.picture
      await pic.move(app.makePath('public/assets/foods'), {
        name: `${cuid()}.${pic.extname}`,
      })

      await Food.create({
        name: data.name,
        description: data.description,
        picture: pic.fileName!,
      })
      return response.redirect().toRoute('page.food')
    } catch (error) {
      session.flash('errors.picture', 'Invalid add food')
      return response.redirect('back')
    }
  }

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
