class CreateLocations < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.integer :site_id
      t.string :description

      t.timestamps
    end
  end
end
