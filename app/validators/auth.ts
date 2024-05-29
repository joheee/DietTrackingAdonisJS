import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().minLength(1),
    password: vine.string().minLength(1),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    name: vine.string().minLength(3),
    picture: vine.string().minLength(1),
    password: vine.string().minLength(3),
    confirm_password: vine.string().minLength(3).sameAs('password'),
  })
)
