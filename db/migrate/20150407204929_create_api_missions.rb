class CreateApiMissions < ActiveRecord::Migration
  def change
    create_table :missions do |t|
      t.integer :leader_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.decimal :compensation
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false
      t.integer :user_limit

      t.timestamps null: false
    end
    add_index :missions, :leader_id
    add_index :missions, :title, unique: true
    add_index :missions, :latitude
    add_index :missions, :longitude
  end
end
