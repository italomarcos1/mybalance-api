'use strict'

const Entry = use('App/Models/Entry')
const User = use('App/Models/User')

class EntryController {
  async index ({ request, response }) {
    try {
      const { id } = request.all()

      const entries = await Entry
        .query()
        .where('user_id', id)
        .fetch()

      return entries
    } catch (err) {
      return response.status(400).json({ message: 'Houve um erro na listagem das entradas.' })
    }
  }

  async store ({ request, response }) {
    try {
      const { user_id, ...data } = request.all()

      const user = await User.find(user_id)

      if (!user) throw new Error('Usuário não encontrado')

      const newEntry = await Entry.create({ ...data, user_id })

      return newEntry
    } catch (err) {
      return response.status(400).json({ message: 'Houve um erro na criação da entrada' })
    }
  }

  async show ({ params, request, response, view }) {

  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = EntryController
