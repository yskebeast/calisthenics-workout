class UserProfile < ApplicationRecord
  has_one_attached :avatar

  validates :better_auth_user_id, presence: true, uniqueness: true
  validates :last_name, presence: true
  validates :first_name, presence: true
end
