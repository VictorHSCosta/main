require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      user = build(:user)
      expect(user).to be_valid
    end

    it 'is invalid without an email' do
      user = build(:user, email: nil)
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'is invalid with a duplicate email' do
      create(:user, email: 'test@example.com')
      user = build(:user, email: 'test@example.com')
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include('has already been taken')
    end

    it 'is invalid with an invalid email format' do
      user = build(:user, email: 'invalid_email')
      expect(user).not_to be_valid
    end

    it 'is invalid without a password' do
      user = build(:user, password: nil)
      expect(user).not_to be_valid
    end

    it 'is invalid with a short password' do
      user = build(:user, password: '12345', password_confirmation: '12345')
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include('is too short (minimum is 6 characters)')
    end
  end

  describe 'devise modules' do
    it 'responds to devise authentication methods' do
      user = build(:user)
      expect(user).to respond_to(:valid_password?)
    end

    it 'encrypts password' do
      user = create(:user, password: 'senha123')
      expect(user.encrypted_password).not_to be_empty
      expect(user.encrypted_password).not_to eq('senha123')
    end
  end

  describe 'admin attribute' do
    it 'defaults admin to false' do
      user = create(:user)
      expect(user.admin).to be false
    end

    it 'can create admin user' do
      user = create(:user, :admin)
      expect(user.admin).to be true
    end
  end

  describe 'authentication' do
    let(:user) { create(:user, email: 'test@example.com', password: 'senha123') }

    it 'authenticates with correct password' do
      expect(user.valid_password?('senha123')).to be true
    end

    it 'does not authenticate with incorrect password' do
      expect(user.valid_password?('wrong_password')).to be false
    end
  end
end
