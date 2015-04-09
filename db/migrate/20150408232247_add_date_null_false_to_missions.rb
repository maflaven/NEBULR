class AddDateNullFalseToMissions < ActiveRecord::Migration
  def change
    remove_column :missions, :date
    add_column :missions, :date, :string, null: false
    add_index :missions, :date
  end
end
