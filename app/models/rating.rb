# == Schema Information
#
# Table name: ratings
#
#  id         :integer          not null, primary key
#  mission_id :string           not null
#  user_id    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  value      :float            not null
#

class Rating < ActiveRecord::Base
  validates :mission_id, :user_id, :rating, presence: true
  validates :mission_id, uniqueness: { scope: :user_id,
                                       message: "can only rate once" }

  belongs_to :mission
  belongs_to :user
end
