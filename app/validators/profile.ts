import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    picture: vine.file({
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'ico'],
    }),
  })
)
