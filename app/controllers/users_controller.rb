class UsersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  def new
    @user = User.new()
  end

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

  def edit
    @user = User.find(params[:id])
    respond_to do |format|
      format.json {render json: @user}
    end
  end

  def update
    @user = User.find(params[:id])
    respond_to do |format|
      if @user.update(user_params)
        format.html {redirect_to @user, notice: 'User successfully updated.'}
        format.json {render :show, status: :updated, location: @user}
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
  end

  def show
    @user = User.find(params[:id])
    @contacts = 
      if @user.patient? 
        Contact.where(patient_id: @user.id) 
      else 
        Contact.where(doctor_id: @user.id) 
      end
    respond_to do |format|
      format.json
    end
  end


  def get_type
    # return user type
    user = User.find_by(:email => params[:email]) 

    # error handling

    render json: user.user_type, status: :ok
  end

  def password_token
    user = User.find_by(:email => params[:email])
    render json: user.reset_password_token, status: :ok
  end

  def update_user
    user = User.find(params[:id])
    user.skype = params[:skype] if params.key?(:skype)
    user.firstname = params[:firstname] if params.key?(:firstname)
    user.lastname = params[:lastname] if params.key?(:lastname)
    user.save!
  end


  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password, :skype, :specialty, :hospital_id, :user_type)
  end
end
