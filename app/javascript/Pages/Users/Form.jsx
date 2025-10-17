import React, { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import Card from '../../Shared/Card'
import Button from '../../Shared/Button'
import Input from '../../Shared/Input'
import Select from '../../Shared/Select'
import Alert from '../../Shared/Alert'

export default function Form({ user = {}, roles, statuses, errors: serverErrors }) {
  const isEditing = !!user.id
  const { data, setData, post, put, processing, errors: formErrors } = useForm({
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'user',
    status: user.status || 'active'
  })

  const errors = { ...formErrors, ...serverErrors }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEditing) {
      put(`/users/${user.id}`)
    } else {
      post('/users')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/users"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg
              className="h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Users
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit User' : 'Create New User'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isEditing
              ? 'Update user information below'
              : 'Fill in the details to create a new user'}
          </p>
        </div>

        {/* Error Alert */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6">
            <Alert
              type="error"
              message="Please correct the errors below and try again."
            />
          </div>
        )}

        {/* Form Card */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <Input
              label="Full Name"
              id="name"
              name="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name?.[0]}
              required
              placeholder="Enter full name"
              disabled={processing}
              helpText="User's full name as it should appear in the system"
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email?.[0]}
              required
              placeholder="user@example.com"
              disabled={processing}
              helpText="Must be a valid and unique email address"
            />

            {/* Role Select */}
            <Select
              label="Role"
              id="role"
              name="role"
              value={data.role}
              onChange={(e) => setData('role', e.target.value)}
              options={roles.map((role) => ({
                value: role,
                label: role.charAt(0).toUpperCase() + role.slice(1)
              }))}
              error={errors.role?.[0]}
              required
              disabled={processing}
            />

            {/* Status Select */}
            <Select
              label="Status"
              id="status"
              name="status"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              options={statuses.map((status) => ({
                value: status,
                label: status.charAt(0).toUpperCase() + status.slice(1)
              }))}
              error={errors.status?.[0]}
              required
              disabled={processing}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Link href="/users">
                <Button type="button" variant="outline" disabled={processing}>
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                loading={processing}
                disabled={processing}
              >
                {processing
                  ? isEditing
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditing
                  ? 'Update User'
                  : 'Create User'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Help Text Card */}
        <Card className="mt-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Field Information</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <strong>Name:</strong> Required. Minimum 2 characters, maximum 100
                characters.
              </li>
              <li>
                <strong>Email:</strong> Required. Must be a valid email format and
                unique in the system.
              </li>
              <li>
                <strong>Role:</strong> Defines the user's permission level:
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• <strong>User:</strong> Standard access</li>
                  <li>• <strong>Manager:</strong> Extended permissions</li>
                  <li>• <strong>Admin:</strong> Full system access</li>
                </ul>
              </li>
              <li>
                <strong>Status:</strong> Controls account accessibility:
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• <strong>Active:</strong> User can access the system</li>
                  <li>• <strong>Inactive:</strong> User access is disabled</li>
                </ul>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
