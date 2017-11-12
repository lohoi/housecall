class ContactsController < ApplicationController
  def create
    doctor = User.find(params[:doctor_id])

    password = Devise.friendly_token.first(8)
    puts password

    patient = User.new(firstname: params[:firstname], lastname: params[:lastname], email: params[:email],
                      skype: params[:skype], password: password, user_type: 1)
    

    if patient.save
      contact = Contact.new(doctor_id: doctor.id, patient_id: patient.id, active: true)
      contact.save

      # need prod mode to send actual emails
      PatientMailer.account_activation(patient, password).deliver_now
    else
      puts patient.errors.full_messages
    end
  end

  # /contacts?user_id=user_id
  def index
    user = User.find(params[:user_id])
    puts user.user_type
    @contacts = []
    if user.doctor?
      # all the patients this doctor has
      user_contacts = Contact.where(doctor_id: user.id, active: true)
      user_contacts.each do |contact|
        puts "doctor_id: #{contact.doctor_id}"
        puts "patient_id: #{contact.patient_id}"
        @contacts.append(User.find(contact.patient_id))
      end
    else
      # the doctor(s) this patient can communicate with
      user_contacts = Contact.where(patient_id: user.id, active: true)
      user_contacts.each do |contact|
        @contacts.append(User.find(contact.doctor_id))
      end
    end

    puts @contacts

    respond_to do |format|
      format.json { render :json => @contacts}
    end
  end

  def destroy
    contact = Contact.find_by_patient_id(params[:id])
    contact.active = false
    contact.save
    puts contact
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password, :skype, :user_type)
  end

end