class CreateReminders < ActiveRecord::Migration[5.1]
  def change
    create_table :reminders do |t|
      t.string :text
      t.integer :user_id
      t.integer :patient_id
      t.boolean :completed

      t.timestamps
    end
  end
end
