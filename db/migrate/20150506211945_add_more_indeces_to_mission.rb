class AddMoreIndecesToMission < ActiveRecord::Migration
  def change
    add_index :missions, :start_date
    add_index :missions, :end_date
    add_index :missions, :compensation
    add_index :ratings, :value
  end
end
