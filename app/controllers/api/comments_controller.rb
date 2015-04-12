class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.user_comments.new(comment_params)

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    unless is_commenter?(@comment)
      render text: "You are not this comment's owner.", status: 403
      return
    end

    if @comment.try(:destroy)
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:commentable_id, :commentable_type, :body)
  end

  def is_commenter?(comment)
    comment.user_id == current_user.id
  end
end
