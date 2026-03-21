class CreateUserProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :user_profiles do |t|
      t.string :better_auth_user_id, null: false
      t.string :last_name, null: false
      t.string :first_name, null: false
      t.integer :height
      t.decimal :weight, precision: 5, scale: 2
      t.date :date_of_birth

      t.timestamps
    end

    add_index :user_profiles, :better_auth_user_id, unique: true
  end
end
