from orator.migrations import Migration


class CreateTodosTable(Migration):

    def up(self):
        """
        Run the migrations.
        """

        with self.db.transaction():
            with self.schema.create('todos') as table:
                table.increments('id')
                table.timestamps()
                table.datetime('due_date').nullable()
                table.small_integer('priority').nullable().default(0)
                table.boolean('completed').default(False)
                table.string('name')
                table.integer('user_id').unsigned()
                table.foreign('user_id').references('id').on('users').on_delete('cascade')

    def down(self):
        """
        Revert the migrations.
        """
        with self.db.transaction():
            self.schema.drop('todos')
