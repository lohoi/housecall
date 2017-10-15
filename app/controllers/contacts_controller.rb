class ContactsController < ApplicationController
  def create
    doctor = User.find(params[:doctor_id])

    password = Devise.friendly_token.first(8)

    patient = User.new(firstname: params[:firstname], lastname: params[:lastname], email: params[:email],
                      skype: params[:skype], password: password, user_type: 1)
    if not patient.save
      puts patient.errors.full_messages
    end

    contact = Contact.new(doctor_id: doctor.id, patient_id: patient.id)
    contact.save

    PatientMailer.account_activation(patient, password).deliver_now

    # respond_to do |format|
    #   if patient.save

    #     contact = Contact.new(doctor_id: doctor.id, patient_id: patient.id)
    #     if contact.save
    #       format.json {head :ok}
    #     else
    #       format.json {status :unprocessable_entity}
    #     end
    #   else
    #     format.json {status :unprocessable_entity}
    #   end
    # end
  end

  # /contacts?user_id=user_id
  def index
    user = User.find(params[:user_id])
    puts user.user_type
    @contacts = []
    if user.doctor?
      # all the patients this doctor has
      user_contacts = Contact.where(doctor_id: user.id)
      user_contacts.each do |contact|
        puts "doctor_id: #{contact.doctor_id}"
        puts "patient_id: #{contact.patient_id}"
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
      format.json { render :json => @contacts}
    end
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password, :skype, :user_type)
  end

end
