# == Schema Information
#
# Table name: missions
#
#  id             :integer          not null, primary key
#  leader_id      :integer          not null
#  title          :string           not null
#  description    :text             not null
#  user_limit     :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  compensation   :integer
#  latitude       :float
#  longitude      :float
#  date           :string           not null
#  filepicker_url :string
#

class Mission < ActiveRecord::Base
  validates :leader_id, :title, :description, :latitude, :longitude,
            :date, presence: true

  belongs_to :leader, class_name: :User
  has_many :enlists, class_name: 'Enlist'
  has_many :enlisted_users, through: :enlists, source: :user
  has_many :follows, class_name: 'Follow'
  has_many :following_users, through: :follows, source: :user
end
