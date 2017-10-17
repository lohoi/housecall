class AddPatientId < ActiveRecord::Migration[5.1]
  def change
    add_column :notes, :patient_id, :integer
  end
end
