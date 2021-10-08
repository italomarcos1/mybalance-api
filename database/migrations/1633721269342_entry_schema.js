'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntrySchema extends Schema {
  async up () {
    this.create('entries', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('type', 3).notNullable()
      table.string('date', 5).notNullable()
      table.string('description').notNullable()
      table.string('amount').notNullable()
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('entries')
  }
}

module.exports = EntrySchema
