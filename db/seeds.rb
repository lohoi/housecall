# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
case Rails.env
  when 'development'
    User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "fakeskypeacc", user_type: 1, hospital_id: 0)
    User.create!(email: 'doctor@test.com', firstname: 'Greatest', lastname: 'Ever', password: "password", skype: "skypeacc", user_type: 0, hospital_id: 0)
    # Reminder.create!(text: "Reminder1", user_id: 4, patient_id: 4, completed: false);
  when 'production'
    doctor = User.create!(email: 'befost1@umich.com', firstname: 'Ben', lastname: 'Foster', password: "password", skype: "bfostervintaclothing", user_type: 0, hospital_id: 0)
    patient = User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "fakeskypeacc", user_type: 1, hospital_id: 0)
    Contact.create!(doctor_id: doctor.id, patient_id: patient.id)
    Note.create!(title: "Drink Water", text: "ayyyy be drinkin more water pls", user_id: doctor.id, patient_id: patient.id)
    # Reminder.create!(text: "Reminder1", user_id: 4, patient_id: 4, completed: false);
end
