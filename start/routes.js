'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('register', 'UserController.store')
Route.put('update', 'UserController.update')

Route.post('files', 'FileController.store')

Route.post('sessions', 'SessionController.store')

Route.post('entry', 'EntryController.store')
Route.post('entries', 'EntryController.index')

Route.get('/', () => {
  return { greeting: 'API MeuBalanço' }
})
