class Api::CommentsController < ApplicationController
  before_action :require_signed_in!

  def create
    @comment = current_user.user_comments.new(comment_params)

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    unless may_delete?(@comment)
      render text: "You are not this comment's owner.", status: 403
      return
    end

    if @comment.try(:destroy)
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:commentable_id, :commentable_type, :body)
  end

  def may_delete?(comment)
    if comment.user_id == current_user.id
      return true
    elsif comment.commentable_type == 'Mission'
      return Mission.find(comment.commentable_id).leader_id == current_user.id
    else
      return User.find(comment.commentable_id).id == current_user.id
    end
  end
end
