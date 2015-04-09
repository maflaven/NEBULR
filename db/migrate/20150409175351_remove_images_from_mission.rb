class RemoveImagesFromMission < ActiveRecord::Migration
  def change
    remove_column :missions, :filepicker_url0
    remove_column :missions, :filepicker_url1
    remove_column :missions, :filepicker_url2
  end
end
