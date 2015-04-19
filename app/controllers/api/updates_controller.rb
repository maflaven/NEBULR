class Api::UpdatesController < ApplicationController
  before_action :require_signed_in!

  def create
    @update = Update.new(update_params)

    unless @update.mission_id && is_mission_leader?(@update)
      render text: "You are not this mission's leader.", status: 403
    end

    if @update.save
      render json: @update
    else
      render json: @update.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @update = Update.find(params[:id])

    unless is_mission_leader?(@update)
      render text: "You are not this mission's leader.", status: 403
      return
    end

    if @update.try(:destroy)
      render json: @update
    else
      render json: @update.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @update = Update.find(params[:id])
    render json: @update
  end

  private

  def update_params
    params.require(:update).permit(:mission_id, :text)
  end

  def is_mission_leader?(update)
    Mission.find(update.mission_id).leader_id == current_user.id
  end
end
