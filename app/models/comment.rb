# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  user_id          :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  body             :text             not null
#

class Comment < ActiveRecord::Base
  validates :commentable_id, :commentable_type, :user_id, :body, presence: true

  belongs_to :commentable, polymorphic: true
  belongs_to :user
end
