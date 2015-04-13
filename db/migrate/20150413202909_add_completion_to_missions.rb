class AddCompletionToMissions < ActiveRecord::Migration
  def change
    add_column :missions, :completed, :boolean, default: false
  end
end
