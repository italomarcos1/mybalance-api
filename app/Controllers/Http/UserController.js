'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.all()

    const user = await User.create(data)

    return user
  }

  async update ({ request, response }) {
    try {
      const data = request.all()

      const user = await User.find(data.id)

      if (!user) throw new Error('Usuário não encontrado')

      const formattedData = Object.entries(data)

      formattedData.forEach(([field, value]) => {
        user[field] = value
      })

      await user.save()

      return user
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}

module.exports = UserController
