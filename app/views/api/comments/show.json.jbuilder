json.extract! @comment, :id, :body
json.user @comment.user, :id, :username, :filepicker_url
