class AddActiveFlagToReminders < ActiveRecord::Migration[5.1]
  def change
    add_column :reminders, :active, :boolean, default: true
  end
end
