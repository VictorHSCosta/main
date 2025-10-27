class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.string :status, null: false, default: 'pending'
      t.string :priority, null: false, default: 'medium'
      t.date :due_date

      t.timestamps
    end

    add_index :tasks, :status
    add_index :tasks, :priority
    add_index :tasks, :due_date
    add_index :tasks, [:status, :priority]
    add_index :tasks, [:status, :due_date]
  end
end