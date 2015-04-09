# == Schema Information
#
# Table name: follows
#
#  id         :integer          not null, primary key
#  mission_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Follow < ActiveRecord::Base
  validates :mission_id, :user_id, presence: true
  validates :mission_id, uniqueness: { scope: :user_id,
                                       message: "can only follow once" }

  belongs_to :mission
  belongs_to :user
end
