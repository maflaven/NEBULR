class ChangeLatLongToFloats < ActiveRecord::Migration
  def change
    remove_column :missions, :latitude
    remove_column :missions, :longitude
    add_column :missions, :latitude, :float
    add_column :missions, :longitude, :float
    add_index :missions, :latitude
    add_index :missions, :longitude
  end
end
