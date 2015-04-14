json.extract! @user, :id, :username, :filepicker_url
json.enlisted_missions @user.enlisted_missions, :id, :title, :images
json.followed_missions @user.followed_missions, :id, :title, :images
json.comments @user.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.user comment.user, :id, :username, :filepicker_url
end
json.is_same_user current_user && current_user.id == @user.id
