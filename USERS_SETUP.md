# Users Management System Setup

This document describes the setup and usage of the Users Management System implemented in this Rails application.

## Overview

The Users Management System provides a complete CRUD interface for managing application users with the following features:

- User listing with pagination, search, and filtering
- Create, read, update, delete operations
- Role-based permissions (Admin, Manager, User)
- Status management (Active, Inactive, Suspended)
- Bulk operations (select and delete multiple users)
- Responsive design with Tailwind CSS
- Inertia.js + React frontend

## Architecture

### Backend (Rails 7.x)
- **Model**: `app/models/user.rb` - User model with validations and scopes
- **Controller**: `app/controllers/users_controller.rb` - CRUD operations and Inertia.js responses
- **Routes**: `config/routes.rb` - RESTful routes with additional status actions
- **Migration**: `db/migrate/20241027140000_create_users.rb` - Database schema

### Frontend (React + Inertia.js)
- **Pages**: `app/javascript/Pages/Users/` - Main user management pages
- **Components**: `app/javascript/Components/UI/` - Reusable UI components
- **Styling**: Tailwind CSS with consistent design system

## Database Schema

### Users Table
- `name` (string) - User's full name
- `email` (string) - Unique email address
- `role` (string) - User role (admin, manager, user)
- `phone` (string) - Phone number (optional)
- `avatar` (string) - Avatar URL (optional)
- `status` (string) - Account status (active, inactive, suspended)
- `created_at` / `updated_at` - Timestamps

### Indexes
- Unique index on `email`
- Indexes on `name`, `role`, `status` for performance

## User Roles and Permissions

### Administrator
- Full system access
- Manage all users and permissions
- Access system settings and configuration
- View all reports and analytics

### Manager
- Manage users within their scope
- Access relevant reports
- Perform management tasks
- Limited system settings access

### User
- Basic access to standard features
- View their own information
- Perform standard user tasks

## User Status States

### Active
- User can log in and use the system
- Full access based on their role

### Inactive
- User cannot log in
- Account preserved for potential reactivation

### Suspended
- User cannot log in
- Temporary restriction due to policy violations

## Features

### User Management
- **List Users**: Paginated table with all users
- **Search**: Filter users by name or email
- **Role Filter**: Filter by user role
- **Bulk Operations**: Select and delete multiple users
- **Status Toggle**: Activate/deactivate users

### User Profile
- **Detailed View**: Complete user information
- **Edit**: Update user details and permissions
- **Delete**: Remove user with confirmation
- **Status Management**: Quick status changes

### Form Validation
- **Email Format**: Valid email address required
- **Unique Email**: No duplicate emails allowed
- **Required Fields**: Name, email, role, status are required
- **Phone Format**: Optional phone number validation

## Installation

### 1. Run Database Migration
```bash
rails db:migrate
```

### 2. Seed Sample Data (Optional)
```bash
rails db:seed
```

This will create sample users:
- 1 Administrator
- 2 Managers
- 8 Regular Users
- Various status states for testing

### 3. Start the Rails Server
```bash
rails server
```

### 4. Access the Users Management
Navigate to `/users` or click the "Users" link in the navigation.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/users` | List users with pagination and filters |
| GET | `/users/new` | New user form |
| POST | `/users` | Create new user |
| GET | `/users/:id` | Show user details |
| GET | `/users/:id/edit` | Edit user form |
| PUT/PATCH | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| PATCH | `/users/:id/activate` | Activate user |
| PATCH | `/users/:id/deactivate` | Deactivate user |

## File Structure

```
app/
├── controllers/
│   └── users_controller.rb          # Main controller
├── models/
│   └── user.rb                      # User model
├── views/pages/
│   └── home.html.erb                # Updated with Users link
└── javascript/
    ├── Components/UI/
    │   ├── Button.jsx               # Reusable button component
    │   ├── Table.jsx                # Table component
    │   └── Pagination.jsx           # Pagination component
    └── Pages/Users/
        ├── Index.jsx                # Users listing page
        ├── Form.jsx                 # Create/edit form
        └── Show.jsx                 # User details page

db/
├── migrate/
│   └── 20241027140000_create_users.rb  # Migration
└── seeds.rb                         # Sample data
```

## Customization

### Adding New User Fields
1. Add columns to the migration
2. Update the User model validations
3. Modify the controller strong params
4. Update React form components
5. Adjust table headers in Index component

### Custom Roles
1. Update the User model validation
2. Modify the `roles_for_select` method
3. Update role badges in React components
4. Adjust permission logic in controllers

### Styling
The system uses Tailwind CSS with an indigo color scheme. Customize colors and styles by modifying:
- Tailwind configuration files
- CSS classes in React components
- Component styling in UI components

## Security Considerations

- CSRF protection enabled by Rails
- Input validation and sanitization
- SQL injection prevention through ActiveRecord
- XSS protection through Rails defaults
- Email uniqueness enforced at database level

## Performance

- Database indexes on frequently queried columns
- Pagination for large user lists
- Efficient filtering and searching
- Lazy loading for user avatars

## Browser Support

- Modern browsers with JavaScript support
- Responsive design for mobile and desktop
- Progressive enhancement principles

## Troubleshooting

### Common Issues

1. **Migration fails**: Check database connection and permissions
2. **Seed data fails**: Ensure migration was run successfully
3. **Users page blank**: Check JavaScript console for errors
4. **Forms not submitting**: Verify CSRF tokens and network requests

### Debug Mode
Enable Rails debug mode in development:
```ruby
# config/environments/development.rb
config.log_level = :debug
```

## Future Enhancements

- User authentication system
- Profile picture uploads
- Password management
- Email notifications
- Activity logging
- Import/export functionality
- Advanced filtering
- User groups/teams
- Two-factor authentication

## Support

For issues or questions about the Users Management System, please refer to the Rails and Inertia.js documentation or contact the development team.