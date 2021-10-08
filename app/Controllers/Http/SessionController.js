'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      const user = await User.findBy('email', email)

      if (!user) throw new Error('Usuário não existe.')

      const token = await auth.attempt(email, password)

      return { token, user }
    } catch (err) {
      return response.status(400).json({ message: 'Combinação email/senha não batem.' })
    }
  }
}

module.exports = SessionController
