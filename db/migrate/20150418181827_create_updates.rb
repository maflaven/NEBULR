class CreateUpdates < ActiveRecord::Migration
  def change
    create_table :updates do |t|
      t.integer :mission_id, null: false
      t.string :text, null: false

      t.timestamps null: false
    end

    add_index :updates, :mission_id
  end
end
