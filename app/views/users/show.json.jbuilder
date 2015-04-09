json.extract! @user, :id, :username, :filepicker_url
json.enlisted_missions @user.enlisted_missions, :id, :title, :images
json.followed_missions @user.followed_missions, :id, :title, :images
