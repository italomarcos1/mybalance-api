'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const { validate } = require('uuid')

const client = new S3({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.IAM_ACCESS_KEY,
    secretAccessKey: process.env.IAM_SECRET_KEY
  }
})

const allowedSubtypes = ['jpg', 'jpeg', 'png']

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const { id } = request.body

      console.log(validate(id))

      const user = await User.find(id)

      if (!user) throw new Error('Usuário não encontrado.')

      const upload = request.file('file')

      if (!allowedSubtypes.includes(upload.subtype)) throw new Error('Envie uma imagem válida (JPG ou PNG).')
      if (upload.size > 4194304) throw new Error('Envie uma imagem de no máximo 4MB.')

      const fileName = `${id}-${Date.now()}.${upload.subtype}`

      const fileStream = fs.createReadStream(upload.tmpPath)

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: fileName
      }

      const uploadedFile = await client.upload(uploadParams).promise()

      const formattedUrl = uploadedFile.Location.split('/')
      const url = `https://storage.trembala.codes/${formattedUrl[formattedUrl.length - 1]}`

      user.avatar = url

      await user.save()

      return response.json({ url })
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = FileController
