class Api::EnlistsController < ApplicationController
  def create
    @enlist = current_user.enlists.new(enlist_params)
    @mission = Mission.find(@enlist.mission_id)

    if @mission.completed
      render text: "Can't enlist in a completed mission.", status: 403
    end

    if @mission.enlisted_users.count == @mission.user_limit
      render text: "Can't enlist in a full mission.", status: 403
    end

    unless @enlist.user_id == current_user.id
      render text: "Access forbidden", status: 403
      return
    end

    if @enlist.save
      render json: @enlist
    else
      render json: @enlist.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @enlist = Enlist.find(params[:id])

    unless @enlist.user_id == current_user.id
      render text: "Access forbidden", status: 403
      return
    end

    if Mission.find(@enlist.mission_id).completed
      render text: "Can't de-enlist in a completed mission.", status: 403
    end

    if @enlist.try(:destroy)
      render json: @enlist
    else
      render json: @enlist.error.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @enlist = Enlist.find(params[:id])
    render json: @enlist
  end

  private

  def enlist_params
    params.require(:enlist).permit(:mission_id)
  end
end
