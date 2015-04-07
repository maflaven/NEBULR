class ChangeCompensationToInteger < ActiveRecord::Migration
  def change
    remove_column :missions, :compensation
    add_column :missions, :compensation, :integer
  end
end
