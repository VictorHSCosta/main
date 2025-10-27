import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function UserShow({ user, filters }) {
  const { flash } = usePage().props;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    router.get(`/users/${user.id}/edit`, filters);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setIsDeleting(true);
      router.delete(`/users/${user.id}`, {
        onFinish: () => setIsDeleting(false)
      });
    }
  };

  const handleToggleStatus = () => {
    const action = user.status === 'active' ? 'deactivate' : 'activate';
    router.patch(`/users/${user.id}/${action}`);
  };

  const handleBack = () => {
    if (filters && Object.keys(filters).length > 0) {
      router.get('/users', filters);
    } else {
      router.get('/users');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-blue-100 text-blue-800',
      user: 'bg-gray-100 text-gray-800'
    };

    const roleLabels = {
      admin: 'Administrator',
      manager: 'Manager',
      user: 'User'
    };

    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${roleClasses[role]}`}>
        {roleLabels[role]}
      </span>
    );
  };

  return (
    <>
      <Head title={`${user.name} - User Details`} />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900 transition flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Users</span>
                </button>
              </div>
              <div className="flex space-x-3">
                {user.status === 'active' ? (
                  <button
                    onClick={handleToggleStatus}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Deactivate</span>
                  </button>
                ) : (
                  <button
                    onClick={handleToggleStatus}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Activate</span>
                  </button>
                )}
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit User</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
                  disabled={isDeleting}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {user.avatar ? (
                    <img
                      className="h-24 w-24 rounded-full border-4 border-white object-cover"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full border-4 border-white bg-white flex items-center justify-center">
                      <span className="text-3xl font-bold text-indigo-600">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-indigo-100 mt-1">{user.email}</p>
                  <div className="flex space-x-3 mt-3">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.phone || (
                          <span className="text-gray-400 italic">Not provided</span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Avatar</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {user.avatar ? (
                          <a
                            href={user.avatar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            View Avatar
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">No avatar</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">User ID</dt>
                      <dd className="mt-1 text-sm text-gray-900">#{user.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Role</dt>
                      <dd className="mt-1">{getRoleBadge(user.role)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1">{getStatusBadge(user.status)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(user.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Permissions Overview */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions Overview</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {user.role === 'admin' && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">
                        <strong>Administrator Access:</strong> This user has full system access including:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                        <li>Manage all users and permissions</li>
                        <li>Access system settings and configuration</li>
                        <li>View all reports and analytics</li>
                        <li>Perform administrative tasks</li>
                      </ul>
                    </div>
                  )}
                  {user.role === 'manager' && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">
                        <strong>Manager Access:</strong> This user has management access including:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                        <li>Manage users within their scope</li>
                        <li>Access relevant reports</li>
                        <li>Perform management tasks</li>
                        <li>Limited system settings access</li>
                      </ul>
                    </div>
                  )}
                  {user.role === 'user' && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">
                        <strong>User Access:</strong> This user has standard access including:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                        <li>Access to basic features</li>
                        <li>View their own information</li>
                        <li>Perform standard user tasks</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${user.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                  {user.status === 'active' ? 'Active' : 'Inactive'}
                </div>
                <div className="text-sm text-gray-600 mt-1">Current Status</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Permission Level</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {Math.floor((Date.now() - new Date(user.created_at)) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-gray-600 mt-1">Days Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}