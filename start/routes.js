'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('register', 'UserController.store')
Route.put('update', 'UserController.update').middleware(['auth'])

Route.post('files', 'FileController.store').middleware(['auth'])

Route.post('sessions', 'SessionController.store')
