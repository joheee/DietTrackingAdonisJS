/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import FoodsController from '#controllers/foods_controller'
import ProfilesController from '#controllers/profiles_controller'
import router from '@adonisjs/core/services/router'

router.on('/bmi').render('pages/bmi/bmi')
router.get('/foods', [FoodsController, 'food']).as('page.food')
router.get('/', [FoodsController, 'landing']).as('page.landing')
router.get('/login', [AuthController, 'login']).as('page.login')
router.post('/login', [AuthController, 'handleLogin']).as('page.handleLogin')
router.get('/register', [AuthController, 'register']).as('page.register')
router.post('/register', [AuthController, 'handleRegister']).as('page.handleRegister')
router.get('/profile', [ProfilesController, 'profile']).as('page.profile')