class PatientMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.patient_mailer.account_activation.subject
  #

  # TODO
  # actually make this an activation email
  # rather than just giving them login creds

  def account_activation(user, password)
    @user = user
    @password = password
    mail to: user.email, subject: "Housecall Login Credentials"
  end
end
