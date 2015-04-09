# == Schema Information
#
# Table name: images
#
#  id             :integer          not null, primary key
#  mission_id     :integer          not null
#  filepicker_url :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Image < ActiveRecord::Base
  validates :mission_id, :filepicker_url, presence: true

  belongs_to :mission
end
