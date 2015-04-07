class Api::MissionsController < ApplicationController
  before_action :require_signed_in!

  def create
    @mission = current_user.missions.create(mission_params)

    if @mission.save
      render json: @mission
    else
      render json: @mission.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @mission = Mission.find(params[:id])

    unless is_leader?(@mission)
      render text: "You are not this mission's leader.", status: 403
    end

    if @mission.update(mission_params)
      render json: @mission
    else
      render json: @mission.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @mission = Mission.find(params[:id])

    unless is_leader?(@mission)
      render text: "You are not this mission's leader.", status: 403
    end

    if @mission.try(:destroy)
      render json: @mission
    else
      render json: @mission.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
  end

  private

  def mission_params
    params.require(:mission).permit(
      :title, :description,
      :compensation, :latutide,
      :longitude, :user_limit
    )
  end

  def is_leader?(mission)
    mission.leader_id == current_user.id
  end
end
