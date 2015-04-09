class TotalThreeImagesPerMission < ActiveRecord::Migration
  def change
    remove_column :missions, :filepicker_url
    add_column :missions, :filepicker_url0, :string
    add_column :missions, :filepicker_url1, :string
    add_column :missions, :filepicker_url2, :string
  end
end
