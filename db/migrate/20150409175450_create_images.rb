class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :mission_id, null: false
      t.string :filepicker_url, null: false

      t.timestamps null: false
    end
    add_index :images, :mission_id
  end
end
