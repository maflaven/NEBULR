json.extract! @user, :id, :username, :filepicker_url
json.enlisted_missions @user.enlisted_missions, :id, :title, :images
json.followed_missions @user.followed_missions, :id, :title, :images
json.comments @user.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.user comment.user, :id, :username, :filepicker_url
end
json.feed @user.feed do |update|
  json.id update.id
  json.text update.text
  json.mission update.mission, :id, :title, :images
  json.created_at update.created_at
end
json.is_same_user current_user && current_user.id == @user.id
