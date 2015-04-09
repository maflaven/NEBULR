class Api::ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)

    unless is_leader?(@image.mission_id)
      render text: "You are not this mission's leader.", status: 403
    end

    if @image.save
      render json: @image
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @image = Image.find(params[:id])

    unless is_leader?(@image.mission_id)
      render text: "You are not this mission's leader.", status: 403
    end

    if @image.try(:destroy)
      render json: @image
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @image = Image.find(params[:id])
    render json: @image
  end

  private

  def image_params
    params.require(:image).permit(:mission_id, :filepicker_url)
  end

  def is_leader?(mission_id)
    Mission.find(mission_id).leader_id == current_user.id
  end
end
