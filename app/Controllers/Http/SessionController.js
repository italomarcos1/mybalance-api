'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      const token = await auth.attempt(email, password)

      return token
    } catch (err) {
      return response.status(400).json({ message: 'Combinação email/senha não batem.' })
    }
  }
}

module.exports = SessionController
