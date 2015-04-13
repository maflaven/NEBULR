# == Schema Information
#
# Table name: ratings
#
#  id         :integer          not null, primary key
#  mission_id :string           not null
#  user_id    :string           not null
#  rating     :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class RatingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
