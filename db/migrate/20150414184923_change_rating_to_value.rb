class ChangeRatingToValue < ActiveRecord::Migration
  def change
    remove_column :ratings, :rating, :float
    add_column :ratings, :value, :float, null: false
  end
end
