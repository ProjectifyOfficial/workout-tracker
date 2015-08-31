class AddUserToExercises < ActiveRecord::Migration
    def change
        add_column :exercises, :user_id, :integer, null: false
    end
end
