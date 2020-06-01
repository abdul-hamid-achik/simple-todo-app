from orator.migrations import Migration


class CreateUsersTable(Migration):

    def up(self):
        """
        Run the migrations.
        """

        with self.db.transaction():
            with self.schema.create('users') as table:
                table.increments('id')
                table.timestamps()
                table.string('first_name')
                table.string('last_name')
                table.string('email')
                table.string('password')

    def down(self):
        """
        Revert the migrations.
        """
        with self.db.transaction():
            self.schema.drop('users')
