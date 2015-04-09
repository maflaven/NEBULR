class AddFilepickerUrlToMissionAndUser < ActiveRecord::Migration
  def change
    add_column :missions, :filepicker_url, :string
    add_column :users, :filepicker_url, :string
  end
end
