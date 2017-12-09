require 'rufus-scheduler'

s = Rufus::Scheduler.singleton

# every night at 3:30 am
s.cron '30 3 * * *' do
  reminders = Reminder.where(active: true, completed: true)
  reminders.each do |reminder|
    reminder.completed = false
    reminder.save!
  end
end