class AddStartEndToMissions < ActiveRecord::Migration
  def change
    add_column :missions, :start_date, :string, null: false
    add_column :missions, :end_date, :string, null: false
  end
end
