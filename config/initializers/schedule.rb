require 'rufus-scheduler'

s = Rufus::Scheduler.singleton

# every day, 1 minute after midnight
s.cron '10 13 * * *' do
  reminders = Reminder.where(active: true, completed: true)
  reminders.each do |reminder|
    reminder.completed = false
    reminder.save!
  end
end