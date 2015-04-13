class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.string :mission_id, null: false
      t.string :user_id, null: false
      t.float :rating, null: false

      t.timestamps null: false
    end
    add_index :ratings, :mission_id
    add_index :ratings, :user_id
    add_index :ratings, [:mission_id, :user_id], unique: true
  end
end
