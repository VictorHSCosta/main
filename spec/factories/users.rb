FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "senha123" }
    password_confirmation { "senha123" }
    admin { false }

    trait :admin do
      admin { true }
    end
  end
end
