class AddPatientDescrip < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :patient_description, :string
  end
end
