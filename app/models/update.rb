# == Schema Information
#
# Table name: updates
#
#  id         :integer          not null, primary key
#  mission_id :integer          not null
#  text       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Update < ActiveRecord::Base
  validates :mission_id, :text, presence: true

  belongs_to :mission
end
