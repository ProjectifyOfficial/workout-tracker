class CreateSets < ActiveRecord::Migration
    def change
        create_table :sets do |t|
            t.integer :exercise_id, null: false
            t.integer :reps, null: false, default: 0
            t.integer :weight, null: false, default: 0
            t.timestamps
        end
    end
end
