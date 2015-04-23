json.extract! @mission, :id, :title, :description, :compensation,
                        :latitude, :longitude, :user_limit, :start_date,
                        :end_date, :completed
json.leader @mission.leader, :id, :username, :filepicker_url
json.enlisted_users @mission.enlisted_users, :id, :username, :filepicker_url
json.following_users @mission.following_users, :id, :username, :filepicker_url
json.enlists @mission.enlists, :id, :mission_id, :user_id
json.follows @mission.follows, :id, :mission_id, :user_id
json.images @mission.images, :id, :mission_id, :filepicker_url
json.comments @mission.comments.sort_by(&:created_at) do |comment|
  json.id comment.id
  json.body comment.body
  json.created_at comment.created_at
  json.user comment.user, :id, :username, :filepicker_url
end
json.ratings @mission.ratings, :id, :value, :user_id
json.ratings_total @mission.ratings.pluck(:value).reduce(:+) || 0
json.ratings_count @mission.ratings.count
json.ratings_avg (@mission.ratings.count > 0 &&
  @mission.ratings.pluck(:value).reduce(:+) / @mission.ratings.count) || 0
json.updates @mission.updates.sort_by(&:created_at), :id, :text, :created_at

json.is_enlisted current_user && @mission.enlisted_users.include?(current_user)
json.is_leader current_user && current_user.id == @mission.leader_id
