json.extract! @mission, :id, :leader_id, :title, :description, :compensation,
                        :latitude, :longitude, :user_limit, :created_at,
                        :updated_at
json.enlisted_users @mission.enlisted_users, :id, :username, :filepicker_url
json.following_users @mission.following_users, :id, :username, :filepicker_url
json.enlists @mission.enlists, :id, :mission_id, :user_id
json.follows @mission.follows, :id, :mission_id, :user_id
json.images @mission.images, :id, :mission_id, :filepicker_url
json.comments @mission.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.user comment.user, :id, :username, :filepicker_url
end
