json.extract! @mission, :id, :leader_id, :title, :description, :compensation,
                        :latitude, :longitude, :user_limit, :created_at,
                        :updated_at
json.enlisted_users @mission.enlisted_users, :id, :username
json.following_users @mission.following_users, :id, :username
json.enlists @mission.enlists, :id, :mission_id, :user_id
json.follows @mission.follows, :id, :mission_id, :user_id
json.images @mission.images, :id, :mission_id, :filepicker_url
