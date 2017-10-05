class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def new
    @user = User.new()
  end

  def create
    def create
      @user = User.new(user_params)
      respond_to do |format|
        if @user.save
          format.html {redirect_to @user, notice: 'User successfully created.'}
          format.json {render :show, status: :created, location: @user}
        else
          format.html { render :new }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end
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
