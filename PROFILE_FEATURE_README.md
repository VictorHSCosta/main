# Profile Page with Password Change Feature

## Overview
This implementation adds a complete authentication system with user profile management and password change functionality to the Rails application.

## Features Implemented

### 1. User Authentication System
- **User Registration**: New users can create accounts with name, email, and password
- **Login/Logout**: Users can securely log in and out of the application
- **Session Management**: User sessions are maintained securely using Rails session store
- **Password Encryption**: Passwords are securely hashed using bcrypt

### 2. Profile Management
- **View Profile**: Users can view their profile information
- **Edit Profile**: Users can update their name and email
- **Change Password**: Dedicated password change functionality with security validations

### 3. Security Features
- Current password verification required before changing password
- Password confirmation on registration and password changes
- Minimum password length of 6 characters
- CSRF protection (built-in Rails feature)
- Authentication requirement for profile access

## Files Created

### Models
- `app/models/user.rb` - User model with validations and secure password

### Controllers
- `app/controllers/sessions_controller.rb` - Login/logout functionality
- `app/controllers/registrations_controller.rb` - User registration
- `app/controllers/profiles_controller.rb` - Profile view, edit, and password change

### Views
- `app/views/sessions/new.html.erb` - Login page
- `app/views/registrations/new.html.erb` - Registration page
- `app/views/profiles/show.html.erb` - Profile display page
- `app/views/profiles/edit.html.erb` - Profile edit and password change page
- `app/views/shared/_navbar.html.erb` - Navigation bar with authentication logic

### Database
- `db/migrate/20251008000001_create_users.rb` - Users table migration

### Configuration
- Updated `Gemfile` - Uncommented bcrypt gem
- Updated `config/routes.rb` - Added authentication and profile routes
- Updated `app/controllers/application_controller.rb` - Added authentication helpers
- Updated `app/views/layouts/application.html.erb` - Added flash message display

## Setup Instructions

### 1. Install Dependencies
```bash
bundle install
```

### 2. Run Database Migrations
```bash
rails db:migrate
```

### 3. Start the Rails Server
```bash
rails server
```

### 4. Access the Application
Open your browser and navigate to `http://localhost:3000`

## Testing the Implementation

### User Registration Flow
1. Click "Login" in the navigation bar
2. Click "Cadastre-se" (Sign up) link
3. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
4. Click "Criar Conta" (Create Account)
5. You should be redirected to the home page with a success message
6. You should see your name in the navbar

### Login Flow
1. If logged in, click "Sair" (Logout)
2. Click "Login" in the navigation bar
3. Enter your credentials:
   - Email: "test@example.com"
   - Password: "password123"
4. Click "Entrar" (Login)
5. You should be redirected to the home page with a success message

### View Profile
1. While logged in, click on your name in the navbar
2. You should see your profile page with:
   - Profile picture placeholder
   - Your name and email
   - Account information card
   - Security information card
   - "Editar Perfil" (Edit Profile) button

### Edit Profile Information
1. From the profile page, click "Editar Perfil"
2. Update your name or email
3. Click "Salvar Alterações" (Save Changes)
4. You should be redirected to the profile page with a success message
5. Your updated information should be displayed

### Change Password
1. From the profile page, click "Editar Perfil"
2. In the "Alterar Senha" (Change Password) section:
   - Enter current password: "password123"
   - Enter new password: "newpassword456"
   - Confirm new password: "newpassword456"
3. Click "Alterar Senha" (Change Password)
4. You should be redirected to the profile page with a success message
5. Test the new password by logging out and logging back in

### Error Handling Tests

#### Test Wrong Current Password
1. Go to Edit Profile
2. Try to change password with wrong current password
3. You should see an error message: "Senha atual incorreta"

#### Test Password Mismatch
1. Go to Edit Profile
2. Enter correct current password
3. Enter different values for new password and confirmation
4. You should see an error message: "Nova senha e confirmação não coincidem"

#### Test Short Password
1. Try to register or change password with less than 6 characters
2. You should see a validation error

#### Test Duplicate Email
1. Try to register with an email that already exists
2. You should see a validation error: "Email já está em uso"

#### Test Access Without Login
1. Log out
2. Try to access `/profile` directly
3. You should be redirected to the login page with message: "Você precisa estar logado para acessar esta página."

## Routes

| Method | Path | Controller#Action | Purpose |
|--------|------|-------------------|---------|
| GET | `/login` | sessions#new | Login page |
| POST | `/login` | sessions#create | Process login |
| DELETE | `/logout` | sessions#destroy | Logout |
| GET | `/signup` | registrations#new | Registration page |
| POST | `/signup` | registrations#create | Create account |
| GET | `/profile` | profiles#show | View profile |
| GET | `/profile/edit` | profiles#edit | Edit profile page |
| PATCH | `/profile` | profiles#update | Update profile |
| PATCH | `/profiles/update_password` | profiles#update_password | Change password |

## Database Schema

### Users Table
```ruby
create_table :users do |t|
  t.string :name, null: false
  t.string :email, null: false
  t.string :password_digest, null: false
  t.timestamps
end

add_index :users, :email, unique: true
```

## Validations

### User Model
- **Name**: Required
- **Email**: Required, unique, valid email format
- **Password**: Minimum 6 characters (on create or when changing password)

## Security Considerations

1. **Password Storage**: Passwords are never stored in plain text, only bcrypt hashes
2. **Session Security**: Sessions use Rails secure session store
3. **CSRF Protection**: All forms include CSRF tokens
4. **Current Password Verification**: Required before allowing password changes
5. **Authentication Requirement**: Profile pages require user to be logged in

## UI/UX Features

1. **Responsive Design**: Works on desktop, tablet, and mobile devices
2. **Flash Messages**: Clear success and error feedback
3. **Consistent Styling**: Tailwind CSS for modern, cohesive design
4. **User-Friendly Forms**: Clear labels, placeholders, and validation messages
5. **Intuitive Navigation**: Easy access to profile and logout from navbar

## Future Enhancements (Not Implemented)

- Password reset via email
- Email verification
- Two-factor authentication
- Profile picture upload
- Account deletion
- Password strength meter
- Remember me functionality
- Session timeout
- Activity log

## Troubleshooting

### Database Issues
If you encounter database errors:
```bash
rails db:drop
rails db:create
rails db:migrate
```

### Routing Issues
Check available routes:
```bash
rails routes | grep -E "(session|registration|profile)"
```

### Clear Sessions
If experiencing session issues, clear browser cookies or use incognito mode.

## Notes

- All text is in Portuguese (Brazilian) to match the project requirements
- The implementation follows Rails conventions and best practices
- The design is consistent with the existing Tailwind CSS styling
- All forms include proper validation and error handling
- Flash messages automatically display and are dismissible
