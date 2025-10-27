# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { 'password123' }
    password_confirmation { 'password123' }
    role { :user }

    trait :admin do
      role { :admin }
    end

    trait :moderator do
      role { :moderator }
    end

    trait :deleted do
      deleted_at { Faker::Time.backward(days: 30) }
    end

    trait :with_password_reset do
      password_reset_token { SecureRandom.hex(10) }
      password_reset_sent_at { Faker::Time.backward(days: 1) }
    end

    trait :expired_password_reset do
      password_reset_token { SecureRandom.hex(10) }
      password_reset_sent_at { 3.hours.ago }
    end

    # Factory for creating users with different roles
    factory :admin_user, parent: :user, traits: [:admin]
    factory :moderator_user, parent: :user, traits: [:moderator]
    factory :deleted_user, parent: :user, traits: [:deleted]

    # Factory for creating user with specific email
    factory :user_with_email do
      transient do
        email_address { nil }
      end

      email { email_address || Faker::Internet.unique.email }
    end

    # Factory for creating user with specific name
    factory :user_with_name do
      transient do
        user_name { nil }
      end

      name { user_name || Faker::Name.name }
    end
  end
end