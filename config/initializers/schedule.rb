require 'rufus-scheduler'

s = Rufus::Scheduler.singleton

# every day, 1 minute after midnight
s.every '1m' do
  reminders = Reminder.where(active: true, completed: true)
  reminders.each do |reminder|
    reminder.completed = false
    reminder.save!
  end
end