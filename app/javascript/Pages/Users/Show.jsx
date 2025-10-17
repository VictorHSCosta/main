import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import Card from '../../Shared/Card'
import Button from '../../Shared/Button'
import Badge from '../../Shared/Badge'
import Modal from '../../Shared/Modal'

export default function Show({ user }) {
  const [deleteModal, setDeleteModal] = useState(false)

  const handleDelete = () => {
    router.delete(`/users/${user.id}`, {
      onSuccess: () => {
        // Redirect is handled by the controller
      }
    })
  }

  const getStatusVariant = (status) => {
    return status === 'active' ? 'success' : 'warning'
  }

  const getRoleBadgeVariant = (role) => {
    const variants = {
      admin: 'danger',
      manager: 'info',
      user: 'default'
    }
    return variants[role] || 'default'
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>

        {/* Main Card */}
        <Card>
          <div className="space-y-6">
            {/* User Info */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <div className="flex space-x-2">
                  <Link href={`/users/${user.id}/edit`}>
                    <Button variant="primary" size="sm">
                      <svg
                        className="h-4 w-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setDeleteModal(true)}
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <p className="text-base text-gray-900">{user.email}</p>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Role
                  </label>
                  <div>
                    <Badge variant={getRoleBadgeVariant(user.role)} size="lg">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Status
                  </label>
                  <div>
                    <Badge variant={getStatusVariant(user.status)} size="lg">
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* User ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    User ID
                  </label>
                  <p className="text-base text-gray-900 font-mono">{user.id}</p>
                </div>

                {/* Created At */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Created At
                  </label>
                  <p className="text-base text-gray-900">{user.created_at}</p>
                </div>

                {/* Updated At */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </label>
                  <p className="text-base text-gray-900">{user.updated_at}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModal}
          onClose={() => setDeleteModal(false)}
          title="Confirm Delete"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete user <strong>{user.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
