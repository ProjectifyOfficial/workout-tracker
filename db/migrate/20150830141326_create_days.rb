class CreateDays < ActiveRecord::Migration
    def change
        create_table :days do |t|
            t.string :name, null: false, default: ""
            t.integer :order, null: false, default: 99
            t.integer :user_id, null: false
            t.timestamps
        end
    end
end
