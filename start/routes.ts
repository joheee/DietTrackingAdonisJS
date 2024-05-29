/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on("/bmi").render("pages/bmi/bmi");
router.on("/foods").render("pages/foods/foods");
router.on('/').render('pages/landing/landing')
router.on("/login").render("pages/login/login");
router.on("/profile").render("pages/profile/profile");
router.on("/register").render("pages/register/register");