class CommentsController < ApplicationController
  def create
  end

  def destroy
  end

  def update
  end

  def index
  end

  private

  def comment_params
    params.require(:comment).permit(:commentable_id, :commentable_type, :body)
  end
end
