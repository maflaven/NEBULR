class Api::EnlistsController < ApplicationController
  def create
    @enlist = current_user.enlists.new(enlist_params)

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
