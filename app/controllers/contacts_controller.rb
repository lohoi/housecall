class ContactsController < ApplicationController
  def create
    doctor = User.find(params[:user_id])

    patient = User.new(user_params)
    patient.save

    contact = Contact.new(doctor_id: doctor.id, patient_id: patient.id)
    contact.save

    # mailer
  end

  # /contacts?user_id=user_id
  def index
    user = User.find(params[:user_id])
    @contacts = []
    if user.doctor?
      # all the patients this doctor has
      user_contacts = Contact.where(doctor_id: user.id)
      user_contacts.each do |contact|
        @contacts.append(User.find(contact.patient_id))
      end
    else
      # the doctor(s) this patient can communicate with
      user_contacts = Contact.where(patient_id: user.id)
      user_contacts.each do |contact|
        @contacts.append(User.find(contact.doctor_id))
      end
    end

    puts @contacts

    respond_to do |format|
      format.json
    end
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password, :skype, :user_type)
  end

end
