class Api::RatingsController < ApplicationController
  def create
    @rating = current_user.ratings.new(enlist_params)

    unless Mission.find(@rating.mission_id).completed
      render text: "Can't rate an incomplete mission.", status: 403
    end

    unless @rating.user_id == current_user.id
      render text: "Access forbidden", status: 403
      return
    end

    if @rating.save
      render json: @rating
    else
      render json: @rating.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @rating = Rating.find(params[:id])

    unless @rating.user_id == current_user.id
      render text: "Access forbidden", status: 403
      return
    end

    if @rating.try(:destroy)
      render json: @rating
    else
      render json: @rating.error.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @rating = Rating.find(params[:id])
    render json: @rating
  end

  private

  def rating_params
    params.require(:rating).permit(:mission_id, :user_id, :rating)
  end
end
