class AddDateToMissions < ActiveRecord::Migration
  def change
    add_column :missions, :date, :string
    add_index :missions, :date
  end
end
