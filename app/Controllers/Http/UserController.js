'use strict'

const { validate } = require('uuid')

const User = use('App/Models/User')

class UserController {
  async store ({ request, response }) {
    try {
      const data = request.all()

      const findUser = await User.findBy('email', data.email)

      if (findUser) throw new Error('Usuário já existe')

      const user = await User.create(data)

      return user
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }

  async update ({ request, response }) {
    try {
      const data = request.all()

      if (!validate(data.id)) throw new Error('O usuário contém um ID inválido')

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
