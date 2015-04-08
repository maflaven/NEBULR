class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :mission_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :follows, :mission_id
    add_index :follows, :user_id
    add_index :follows, [:mission_id, :user_id], unique: true
  end
end
