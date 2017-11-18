class UpdateEvents < ActiveRecord::Migration[5.1]
  def change
    remove_column :events, :primaryColor
    remove_column :events, :secondaryColor
    add_column :events, :color, :string
  end
end
