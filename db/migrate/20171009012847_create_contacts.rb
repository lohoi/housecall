class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.integer  :doctor_id
      t.integer  :patient_id
      t.boolean  :activated?
      t.datetime :activated_at

      t.timestamps
    end
  end
end
