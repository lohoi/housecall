class AddActiveToContact < ActiveRecord::Migration[5.1]
  def change
    add_column :contacts, :active, :boolean, default: true
  end
end
