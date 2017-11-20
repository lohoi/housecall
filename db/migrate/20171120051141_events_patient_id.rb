class EventsPatientId < ActiveRecord::Migration[5.1]
  def change
    remove_column :events, :patiend_id
    add_column :events, :patient_id, :int
  end
end
