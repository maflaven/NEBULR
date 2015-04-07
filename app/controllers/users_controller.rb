class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_user!(user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
  end

  def update
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
