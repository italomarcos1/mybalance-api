'use strict'

const User = use('App/Models/User')
const Entry = use('App/Models/Entry')

class SessionController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      const user = await User.findBy('email', email)

      if (!user) throw new Error('Usuário não existe.')

      await auth.attempt(email, password)

      const entries = await Entry
        .query()
        .where('user_id', user.id)
        .fetch()

      return { entries, user }
    } catch (err) {
      return response.status(400).json({ message: 'Combinação email/senha não batem.' })
    }
  }
}

module.exports = SessionController
