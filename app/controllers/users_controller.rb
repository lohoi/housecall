class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def new
    @user = User.new()
  end

  def create
    @user = User.new(user_params)
    puts params
    @user.save
  end

  def update
  end

  def destroy
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password, :skype, :specialty, :hospital_id, :user_type)
  end
end
