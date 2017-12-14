# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
case Rails.env
  when 'development'
    # ID: 1
    doctor = User.create!(email: 'befost1@umich.com', firstname: 'Ben', lastname: 'Foster', password: "password", skype: "bfostervintaclothing", user_type: 0,            hospital_id: 0)

    # ID: 2
    patient1 = User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "tabman_skype", user_type: 1, hospital_id: 0, patient_description: "Recovering from pneumonia, cough has mostly subsided", doctor_id: doctor.id)
    Contact.create!(doctor_id: doctor.id, patient_id: patient1.id)
    Note.create!(title: "Drink Water", text: "I need to remember to drink more water", user_id: patient1.id, patient_id: patient1.id)
    Note.create!(title: "Bed Rest", text: "Doctor told me to stay in best mostly", user_id: patient1.id, patient_id: patient1.id)    
    Reminder.create!(text: "Drink 8 cups of water today", user_id: doctor.id, patient_id: patient1.id, completed: false);
    Reminder.create!(text: "Smile!", user_id: doctor.id, patient_id: patient1.id, completed: false);    
    Reminder.create!(text: "Eat Breakfast", user_id: doctor.id, patient_id: patient1.id, completed: true);    
    Event.create!(title: "EECS 498 - 10 Presentation", 
                  description: "Hopefully the demo works!",
                  start: "Thur Dec 14 2017 10:30:00 GMT-0500 (EST)",
                  end: "Thur Dec 14 2017 11:00:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient1.id)
    Event.create!(title: "Celebrate the End of the Semester!", 
                  description: "School's Out!",
                  start: "Fri Dec 15 2017 20:00:00 GMT-0500 (EST)",
                  end: "Sat Dec 16 2017 02:00:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient1.id)
    
    # ID: 3
    patient2 = User.create!(email: 'remsr@umich.edu', firstname: 'Remington', lastname: 'Reackhof', password: "password", skype: "remingtonreackhof@gmail.com", user_type: 1, hospital_id: 0, patient_description: "Suffering from massive head trauma", doctor_id: doctor.id)
    Contact.create!(doctor_id: doctor.id, patient_id: patient2.id)
    Note.create!(title: "Bed Rest", text: "Doctor told me to stay in best mostly", user_id: patient2.id, patient_id: patient2.id)  
    Note.create!(title: "Don't watch too much TV", text: "Gotta study", user_id: patient2.id, patient_id: patient2.id)  
    Reminder.create!(text: "Replace Bandages", user_id: doctor.id, patient_id: patient2.id, completed: false);
    Reminder.create!(text: "Smile!", user_id: doctor.id, patient_id: patient2.id, completed: false);    
    Event.create!(title: "Birthday!", 
                  description: "Wow!",
                  start: "Wed Dec 06 2017 13:30:00 GMT-0500 (EST)",
                  end: "Wed Dec 06 2017 15:30:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient2.id)
    Event.create!(title: "EECS 498 Exam", 
                  description: "Good Luck!",
                  start: "Fri Dec 15 2017 13:30:00 GMT-0500 (EST)",
                  end: "Fri Dec 15 2017 15:30:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient2.id)
    Event.create!(title: "Celebrate the End of the Semester!", 
                  description: "School's Out!",
                  start: "Fri Dec 15 2017 20:00:00 GMT-0500 (EST)",
                  end: "Sat Dec 16 2017 02:00:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient2.id)        

    # User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "fakeskypeacc", user_type: 1, hospital_id: 0)
    # User.create!(email: 'doctor@test.com', firstname: 'Greatest', lastname: 'Ever', password: "password", skype: "skypeacc", user_type: 0, hospital_id: 0)
  when 'production'
    # ID: 1
    doctor = User.create!(email: 'befost1@umich.com', firstname: 'Ben', lastname: 'Foster', password: "password", skype: "bfostervintaclothing", user_type: 0,            hospital_id: 0)

    # ID: 2
    patient1 = User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "tabman_skype", user_type: 1, hospital_id: 0, patient_description: "Recovering from pneumonia, cough has mostly subsided", doctor_id: doctor.id)
    Contact.create!(doctor_id: doctor.id, patient_id: patient1.id)
    Note.create!(title: "Drink Water", text: "I need to remember to drink more water", user_id: patient1.id, patient_id: patient1.id)
    Note.create!(title: "Bed Rest", text: "Doctor told me to stay in best mostly", user_id: patient1.id, patient_id: patient1.id)    
    Reminder.create!(text: "Drink 8 cups of water today", user_id: doctor.id, patient_id: patient1.id, completed: false);
    Reminder.create!(text: "Smile!", user_id: doctor.id, patient_id: patient1.id, completed: false);    
    Reminder.create!(text: "Eat Breakfast", user_id: doctor.id, patient_id: patient1.id, completed: true);    
    Event.create!(title: "EECS 498 - 10 Presentation", 
                  description: "Hopefully the demo works!",
                  start: "Thur Dec 14 2017 10:30:00 GMT-0500 (EST)",
                  end: "Thur Dec 14 2017 11:00:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient1.id)
    Event.create!(title: "Celebrate the End of the Semester!", 
                  description: "School's Out!",
                  start: "Fri Dec 15 2017 20:00:00 GMT-0500 (EST)",
                  end: "Sat Dec 16 2017 02:00:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient1.id)
    
    # ID: 3
    patient2 = User.create!(email: 'remsr@umich.edu', firstname: 'Remington', lastname: 'Reackhof', password: "password", skype: "remingtonreackhof@gmail.com", user_type: 1, hospital_id: 0, patient_description: "Suffering from massive head trauma", doctor_id: doctor.id)
    Contact.create!(doctor_id: doctor.id, patient_id: patient2.id)
    Note.create!(title: "Bed Rest", text: "Doctor told me to stay in best mostly", user_id: patient2.id, patient_id: patient2.id)  
    Note.create!(title: "Don't watch too much TV", text: "Gotta study", user_id: patient2.id, patient_id: patient2.id)  
    Reminder.create!(text: "Replace Bandages", user_id: doctor.id, patient_id: patient2.id, completed: false);
    Reminder.create!(text: "Smile!", user_id: doctor.id, patient_id: patient2.id, completed: false);    
    Event.create!(title: "Birthday!", 
                  description: "Wow!",
                  start: "Wed Dec 06 2017 13:30:00 GMT-0500 (EST)",
                  end: "Wed Dec 06 2017 15:30:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient2.id)
    Event.create!(title: "EECS 498 Exam", 
                  description: "Good Luck!",
                  start: "Fri Dec 15 2017 13:30:00 GMT-0500 (EST)",
                  end: "Fri Dec 15 2017 15:30:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient2.id)
    Event.create!(title: "Celebrate the End of the Semester!", 
                  description: "School's Out!",
                  start: "Fri Dec 15 2017 20:00:00 GMT-0500 (EST)",
                  end: "Sat Dec 16 2017 02:00:00 GMT-0500 (EST)",
                  color: "#D32F2F",
                  allDay: false,
                  draggable: true,        
                  resizeBeforeStart: true,
                  resizeAfterEnd: true,
                  user_id: doctor.id,
                  patient_id: patient2.id)      
    # doctor = User.create!(email: 'befost1@umich.com', firstname: 'Ben', lastname: 'Foster', password: "password", skype: "bfostervintaclothing", user_type: 0,            hospital_id: 0)
    # patient = User.create!(email: 'patient@test.com', firstname: 'Spaceboy', lastname: 'Tabman', password: "password", skype: "fakeskypeacc", user_type: 1, hospital_id: 0, patient_description: "recovering from pneumonia, cough has mostly subsided", doctor_id: 1)
    # Contact.create!(doctor_id: doctor.id, patient_id: patient.id)
    # Note.create!(title: "Drink Water", text: "ayyyy be drinkin more water pls", user_id: doctor.id, patient_id: patient.id)
    # Reminder.create!(text: "Reminder1", user_id: 4, patient_id: 4, completed: false);
end