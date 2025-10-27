import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function UserForm({ user, roles, statuses, filters }) {
  const { flash } = usePage().props;
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    status: user?.status || 'active'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!user?.id;
  const pageTitle = isEditing ? 'Edit User' : 'New User';

  useEffect(() => {
    // Show flash messages
    if (flash?.success) {
      console.log(flash.success);
    }
    if (flash?.error) {
      console.error(flash.error);
    }
  }, [flash]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = {
      ...formData,
      _method: isEditing ? 'PUT' : 'POST'
    };

    router.post(
      isEditing ? `/users/${user.id}` : '/users',
      submitData,
      {
        onSuccess: () => {
          setIsSubmitting(false);
          // Navigation is handled by the controller redirect
        },
        onError: (errors) => {
          setIsSubmitting(false);
          setErrors(errors);
        }
      }
    );
  };

  const handleCancel = () => {
    if (filters && Object.keys(filters).length > 0) {
      router.get('/users', filters);
    } else {
      router.get('/users');
    }
  };

  const getFieldError = (fieldName) => {
    if (errors[fieldName]) {
      return typeof errors[fieldName] === 'string'
        ? errors[fieldName]
        : errors[fieldName]?.join(', ');
    }
    return null;
  };

  const getFieldClasses = (fieldName) => {
    const baseClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";
    const errorClasses = getFieldError(fieldName)
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300";
    return `${baseClasses} ${errorClasses}`;
  };

  return (
    <>
      <Head title={pageTitle} />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
                <p className="mt-2 text-gray-600">
                  {isEditing
                    ? 'Update user information and permissions'
                    : 'Create a new user account'
                  }
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-900 transition flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Cancel</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={getFieldClasses('name')}
                      placeholder="Enter user's full name"
                      required
                    />
                    {getFieldError('name') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={getFieldClasses('email')}
                      placeholder="user@example.com"
                      required
                    />
                    {getFieldError('email') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={getFieldClasses('phone')}
                      placeholder="+1 (555) 123-4567"
                    />
                    {getFieldError('phone') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
                    )}
                  </div>

                  {/* Avatar URL */}
                  <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      id="avatar"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      className={getFieldClasses('avatar')}
                      placeholder="https://example.com/avatar.jpg"
                    />
                    {getFieldError('avatar') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('avatar')}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Permissions and Status */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Permissions and Status</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={getFieldClasses('role')}
                      required
                    >
                      {roles?.map(role => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                    {getFieldError('role') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('role')}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={getFieldClasses('status')}
                      required
                    >
                      {statuses?.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    {getFieldError('status') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('status')}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isSubmitting ? 'Saving...' : (isEditing ? 'Update User' : 'Create User')}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Information about user roles</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Administrator:</strong> Full access to all system features and settings</li>
                    <li><strong>Manager:</strong> Can manage users and view reports, but limited system settings</li>
                    <li><strong>User:</strong> Basic access to standard features only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}