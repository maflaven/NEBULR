# == Schema Information
#
# Table name: missions
#
#  id           :integer          not null, primary key
#  leader_id    :integer          not null
#  title        :string           not null
#  description  :text             not null
#  compensation :decimal(, )
#  latitude     :decimal(, )      not null
#  longitude    :decimal(, )      not null
#  user_limit   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Mission < ActiveRecord::Base
  validates :leader_id, :title, :description, :latitude, :longitude, presence: true

  belongs_to :leader, class_name: :User
end
