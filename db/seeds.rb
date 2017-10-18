# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "fakeskypeacc", user_type: 1)
User.create!(email: 'doctor@test.com', firstname: 'Greatest', lastname: 'Ever', password: "password", skype: "skypeacc", user_type: 0)
Contact.create!(doctor_id: 1, patient_id: 0)
PatientDescription.create!(patient_id: 0, doctor_id: 1, text: "This is a patient description")
