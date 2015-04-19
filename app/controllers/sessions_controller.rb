class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      sign_in!(@user)
      render json: @user.id
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    sign_out!
    render text: "Successfully logged out."
  end
end
