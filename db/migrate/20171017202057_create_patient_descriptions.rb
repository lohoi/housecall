class CreatePatientDescriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :patient_descriptions do |t|
      t.integer :patient_id
      t.integer :doctor_id
      t.string :text
      t.timestamps
    end
  end
end
