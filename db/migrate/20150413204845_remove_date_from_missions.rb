class RemoveDateFromMissions < ActiveRecord::Migration
  def change
    remove_column :missions, :date
  end
end
