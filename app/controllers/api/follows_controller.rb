class Api::FollowsController < ApplicationController
  before_action :require_signed_in!

  def create
    @follow = current_user.follows.new(follow_params)

    unless @follow.user_id == current_user.id
      render text: "Access forbidden", status: 403
      return
    end

    if @follow.save
      render json: @follow
    else
      render json: @follow.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = Follow.find(params[:id])

    unless @follow.user_id == current_user.id
      render text: "Access forbidden", status: 403
      return
    end

    if @follow.try(:destroy)
      render json: @follow
    else
      render json: @follow.error.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @follow = Follow.find(params[:id])
    render json: @follow
  end

  private

  def follow_params
    params.require(:follow).permit(:mission_id)
  end
end
