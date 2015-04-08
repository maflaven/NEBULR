class Enlist < ActiveRecord::Base
  validates :mission_id, :user_id, presence: true
  validates :mission_id, uniqueness: { scope: :user_id,
                                       message: "can only enlist once" }

  belongs_to :mission
  belongs_to :user
end
