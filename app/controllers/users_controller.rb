class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render json: @user.id
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    @users = User.all
    render :index
  end

  def destroy
  end

  def update
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :filepicker_url)
  end
end
