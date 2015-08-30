class CreateExercises < ActiveRecord::Migration
    def change
        create_table :exercises do |t|
            t.string :name, null: false, default: ""
            t.integer :rank, null: false, default: 99
            t.integer :sets, null: false, default: 4
            t.integer :one_rep_base_weight, null: false, default: 0
            t.integer :cumulative_base_weight, null: false, default: 0
            t.integer :day_id
            t.timestamps
        end
    end
end
