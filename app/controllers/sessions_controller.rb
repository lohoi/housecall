class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    respond_to do |format|
      if user && user.authenticate(params[:session][:password])
        log_in user
        format.html { redirect_to user}
      else
        format.html { render :new, notice: "Login failed, invalid email/password combination" }
        format.json {}
      end
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

end