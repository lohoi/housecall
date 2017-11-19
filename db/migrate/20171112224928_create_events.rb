class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.string :start
      t.string :end
      t.string :primaryColor
      t.string :secondaryColor
      t.boolean :allDay
      t.boolean :draggable
      t.boolean :resizeBeforeStart
      t.boolean :resizeAfterEnd
      t.integer :user_id
      t.integer :patiend_id

      t.timestamps
    end
  end
end
