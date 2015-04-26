# == Schema Information
#
# Table name: missions
#
#  id           :integer          not null, primary key
#  leader_id    :integer          not null
#  title        :string           not null
#  description  :text             not null
#  user_limit   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  compensation :integer
#  latitude     :float
#  longitude    :float
#  completed    :boolean          default(FALSE)
#  start_date   :string           not null
#  end_date     :string           not null
#

class Mission < ActiveRecord::Base
  validates :leader_id, :title, :description, :latitude, :longitude,
            :start_date, :end_date, presence: true
  validates :title, uniqueness: true

  belongs_to :leader, class_name: :User
  has_many :enlists, class_name: 'Enlist', dependent: :destroy
  has_many :enlisted_users, through: :enlists, source: :user
  has_many :follows, class_name: 'Follow', dependent: :destroy
  has_many :following_users, through: :follows, source: :user
  has_many :images, dependent: :destroy
  has_many :comments, as: :commentable
  has_many :ratings
  has_many :updates

  def self.filter_by(data_type, min, max, missions_set=false)
    missions_set ||= Mission.all

    missions_set.where(data_type => min..max)
  end

  def self.filter_by_avg_rating(min_rating, max_rating, missions_set=false)
    missions_set ||= Mission.all

    missions_set.select do |mission|
      mission.avg_rating >= min_rating.to_f &&
        mission.avg_rating <= max_rating.to_f
    end
  end

  def self.filter_by_title_fragment(fragment, missions_set=false)
    missions_set ||= Mission.all

    missions_set.where("title LIKE ?", "%" + fragment + "%")
  end

  def avg_rating
    return 0 if ratings.count == 0
    ratings.pluck(:value).inject(:+) / ratings.count
  end
end
