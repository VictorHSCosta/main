class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :role, null: false, default: 'user'
      t.string :phone
      t.string :avatar
      t.string :status, null: false, default: 'active'
      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :name
    add_index :users, :role
    add_index :users, :status
  end
end