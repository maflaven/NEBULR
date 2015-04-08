json.extract! @user, :id, :username
json.enlisted_missions @user.enlisted_missions, :id, :title
json.followed_missions @user.followed_missions, :id, :title
