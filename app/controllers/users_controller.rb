class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render json: @user.id
    else
      flash.now[:errors] = @user.errors.full_messages
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
