# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "fakeskypeacc", user_type: 1, hospital_id: 0)
User.create!(email: 'doctor@test.com', firstname: 'Greatest', lastname: 'Ever', password: "password", skype: "skypeacc", user_type: 0, hospital_id: 0)
