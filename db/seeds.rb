# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(email: 'test@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "fakeskypeacc_doctor", user_type: 0)
User.create!(email: 'test2@test.com', firstname: 'A', lastname: 'Patient', password: "password", skype: "fakeskypeacc_patient", user_type: 1)
Contact.create!(doctor_id: 0, patient_id: 1)
PatientDescription.create!(patient_id: 1, doctor_id: 0, text: "This is a patient description")