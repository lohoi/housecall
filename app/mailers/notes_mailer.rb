class NotesMailer < ApplicationMailer

  def send_note(note, patient, doctor)
    @note = note
    @patient = patient
    @doctor = doctor
    puts "here"
    mail to: patient.email, subject: "New Note from Dr. #{doctor.lastname}"
  end

end
