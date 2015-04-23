json.extract! @user, :id, :username, :filepicker_url
json.enlisted_missions @user.enlisted_missions do |mission|
  json.id mission.id
  json.title mission.title
  json.compensation mission.compensation
  json.images mission.images
  json.leader mission.leader
end
json.comments @user.comments.sort_by(&:created_at) do |comment|
  json.id comment.id
  json.body comment.body
  json.user comment.user, :id, :username, :filepicker_url
end
json.feed @user.feed.sort { |a, b| b.created_at <=> a.created_at } do |update|
  json.id update.id
  json.text update.text
  json.mission update.mission, :id, :title, :images
  json.created_at update.created_at
end
json.is_same_user current_user && current_user.id == @user.id
