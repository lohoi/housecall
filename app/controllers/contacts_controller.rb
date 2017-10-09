class ContactsController < ApplicationController
  def create
    doctor = User.find(params[:user_id])

    patient = User.new(user_params)
    patient.save

    contact = Contact.new(doctor_id: doctor.id, patient_id: patient.id)
    contact.save

    # mailer
  end

  def index
    user = User.find(params[:user_id])
    @contacts = Contact.where(user_id: user.id)
    respond_to do |format|
      format.json {render json: @contacts}
    end
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password, :skype, :user_type)
  end

end
