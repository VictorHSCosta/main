require 'rails_helper'

RSpec.describe 'User Authentication', type: :feature do
  describe 'User Sign Up' do
    it 'allows a user to sign up with valid credentials' do
      visit new_user_registration_path

      fill_in 'Email', with: 'newuser@example.com'
      fill_in 'Senha (mínimo caracteres)', with: 'senha123'
      fill_in 'Confirmar senha', with: 'senha123'
      click_button 'Cadastrar'

      expect(page).to have_content('Welcome! You have signed up successfully.')
      expect(User.last.email).to eq('newuser@example.com')
    end

    it 'does not allow sign up with invalid email' do
      visit new_user_registration_path

      fill_in 'Email', with: 'invalid_email'
      fill_in 'Senha (mínimo caracteres)', with: 'senha123'
      fill_in 'Confirmar senha', with: 'senha123'
      click_button 'Cadastrar'

      expect(page).to have_content('error')
    end

    it 'does not allow sign up with short password' do
      visit new_user_registration_path

      fill_in 'Email', with: 'newuser@example.com'
      fill_in 'Senha (mínimo caracteres)', with: '123'
      fill_in 'Confirmar senha', with: '123'
      click_button 'Cadastrar'

      expect(page).to have_content('too short')
    end
  end

  describe 'User Sign In' do
    let!(:user) { create(:user, email: 'test@example.com', password: 'senha123') }

    it 'allows a user to sign in with valid credentials' do
      visit new_user_session_path

      fill_in 'Email', with: 'test@example.com'
      fill_in 'Senha', with: 'senha123'
      click_button 'Entrar'

      expect(page).to have_content('Signed in successfully.')
    end

    it 'does not allow sign in with invalid email' do
      visit new_user_session_path

      fill_in 'Email', with: 'wrong@example.com'
      fill_in 'Senha', with: 'senha123'
      click_button 'Entrar'

      expect(page).to have_content('Invalid Email or password')
    end

    it 'does not allow sign in with invalid password' do
      visit new_user_session_path

      fill_in 'Email', with: 'test@example.com'
      fill_in 'Senha', with: 'wrongpassword'
      click_button 'Entrar'

      expect(page).to have_content('Invalid Email or password')
    end

    it 'remembers the user when remember me is checked' do
      visit new_user_session_path

      fill_in 'Email', with: 'test@example.com'
      fill_in 'Senha', with: 'senha123'
      check 'Lembrar de mim'
      click_button 'Entrar'

      expect(page).to have_content('Signed in successfully.')
    end
  end

  describe 'User Sign Out' do
    let!(:user) { create(:user, email: 'test@example.com', password: 'senha123') }

    it 'allows a signed-in user to sign out' do
      sign_in user
      visit root_path

      # Assuming there's a sign out link in the navigation
      # This may need to be adjusted based on your actual implementation
      click_button 'Sign out' # or click_link depending on your implementation

      expect(page).to have_content('Signed out successfully.')
    end
  end

  describe 'Password Recovery' do
    let!(:user) { create(:user, email: 'test@example.com', password: 'senha123') }

    it 'allows a user to request password reset instructions' do
      visit new_user_password_path

      fill_in 'Email', with: 'test@example.com'
      click_button 'Enviar instruções'

      expect(page).to have_content('You will receive an email with instructions')
    end

    it 'shows error for non-existent email' do
      visit new_user_password_path

      fill_in 'Email', with: 'nonexistent@example.com'
      click_button 'Enviar instruções'

      expect(page).to have_content('not found')
    end
  end

  describe 'Admin Users' do
    let!(:admin_user) { create(:user, :admin, email: 'admin@example.com', password: 'senha123') }
    let!(:regular_user) { create(:user, email: 'user@example.com', password: 'senha123') }

    it 'creates admin user with admin flag set to true' do
      expect(admin_user.admin).to be true
    end

    it 'creates regular user with admin flag set to false' do
      expect(regular_user.admin).to be false
    end
  end
end
