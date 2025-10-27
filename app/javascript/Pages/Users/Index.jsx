import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function UsersIndex({ users, filters, pagination, roles, statuses }) {
  const { flash } = usePage().props;
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');
  const [selectedRole, setSelectedRole] = useState(filters?.role || '');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Show flash messages
    if (flash?.success) {
      // You could integrate a toast notification system here
      console.log(flash.success);
    }
    if (flash?.error) {
      console.error(flash.error);
    }
  }, [flash]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      '/users',
      {
        search: searchTerm,
        role: selectedRole,
        page: 1
      },
      { preserveState: true }
    );
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    router.get(
      '/users',
      {
        search: searchTerm,
        role: role,
        page: 1
      },
      { preserveState: true }
    );
  };

  const handlePageChange = (page) => {
    router.get(
      '/users',
      {
        search: searchTerm,
        role: selectedRole,
        page: page
      },
      { preserveState: true }
    );
  };

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setIsDeleting(true);
      router.delete(`/users/${userId}`, {
        onFinish: () => setIsDeleting(false)
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      alert('Please select users to delete');
      return;
    }

    if (confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
      selectedUsers.forEach(userId => {
        router.delete(`/users/${userId}`);
      });
      setSelectedUsers([]);
    }
  };

  const handleToggleStatus = (userId, action) => {
    router.patch(`/users/${userId}/${action}`);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const getStatusBadge = (user) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[user.status]}`}>
        {user.status}
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
      admin: 'Admin',
      manager: 'Manager',
      user: 'User'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleClasses[role]}`}>
        {roleLabels[role]}
      </span>
    );
  };

  return (
    <>
      <Head title="Users" />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
                <p className="mt-2 text-gray-600">Manage your application users and their permissions</p>
              </div>
              <div className="flex space-x-3">
                {selectedUsers.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
                  >
                    <span>Delete Selected ({selectedUsers.length})</span>
                  </button>
                )}
                <a
                  href="/users/new"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>New User</span>
                </a>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All Roles</option>
                    {roles?.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {users.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === users.length}
                            onChange={toggleAllUsers}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {user.avatar ? (
                                  <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={user.avatar}
                                    alt={user.name}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <span className="text-indigo-600 font-medium">
                                      {user.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getRoleBadge(user.role)}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(user)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {user.phone || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex space-x-2">
                              <a
                                href={`/users/${user.id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View
                              </a>
                              <a
                                href={`/users/${user.id}/edit`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </a>
                              {user.status === 'active' ? (
                                <button
                                  onClick={() => handleToggleStatus(user.id, 'deactivate')}
                                  className="text-yellow-600 hover:text-yellow-900"
                                >
                                  Deactivate
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleToggleStatus(user.id, 'activate')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Activate
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-600 hover:text-red-900"
                                disabled={isDeleting}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.total_pages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(pagination.prev_page)}
                        disabled={!pagination.prev_page}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.next_page)}
                        disabled={!pagination.next_page}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing{' '}
                          <span className="font-medium">
                            {(pagination.current_page - 1) * pagination.per_page + 1}
                          </span>{' '}
                          to{' '}
                          <span className="font-medium">
                            {Math.min(pagination.current_page * pagination.per_page, pagination.total_count)}
                          </span>{' '}
                          of{' '}
                          <span className="font-medium">{pagination.total_count}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(page => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === pagination.current_page
                                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || selectedRole ? 'Try adjusting your search or filters' : 'Get started by creating a new user'}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href="/users/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    New User
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}