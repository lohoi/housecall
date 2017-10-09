class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string "email"
      t.string "skype"
      t.string "firstname"
      t.string "lastname"
      t.string "password"
      t.integer "specialty"
      t.integer "hospital_id"
      t.integer "user_type"
      t.timestamps
    end
  end
end
