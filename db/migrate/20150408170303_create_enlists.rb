class CreateEnlists < ActiveRecord::Migration
  def change
    create_table :enlists do |t|
      t.integer :mission_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :enlists, :mission_id
    add_index :enlists, :user_id
    add_index :enlists, [:mission_id, :user_id], unique: true
  end
end
