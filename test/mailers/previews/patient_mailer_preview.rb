# Preview all emails at http://localhost:3000/rails/mailers/patient_mailer
class PatientMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/patient_mailer/account_activation
  def account_activation
    user = User.first
    password = "blahblah1"
    PatientMailer.account_activation(user, password)
  end

end
