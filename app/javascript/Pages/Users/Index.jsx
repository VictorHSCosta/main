import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import Card from '../../Shared/Card'
import Table from '../../Shared/Table'
import Button from '../../Shared/Button'
import Badge from '../../Shared/Badge'
import Pagination from '../../Shared/Pagination'
import Modal from '../../Shared/Modal'
import Alert from '../../Shared/Alert'

export default function Index({ users, pagination, flash }) {
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null })
  const [alert, setAlert] = useState(flash)

  const handleDelete = (user) => {
    setDeleteModal({ isOpen: true, user })
  }

  const confirmDelete = () => {
    if (deleteModal.user) {
      router.delete(`/users/${deleteModal.user.id}`, {
        onSuccess: () => {
          setDeleteModal({ isOpen: false, user: null })
          setAlert({ type: 'success', message: 'User deleted successfully' })
        },
        onError: () => {
          setAlert({ type: 'error', message: 'Failed to delete user' })
        }
      })
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and view all users in the system
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-6">
            <Alert
              type={alert.type || 'info'}
              message={alert.message || alert.notice || alert.alert}
              onClose={() => setAlert(null)}
              autoDismiss={true}
            />
          </div>
        )}

        {/* Main Card */}
        <Card>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
              <p className="text-sm text-gray-600 mt-1">
                Total: {pagination.total_count} users
              </p>
            </div>
            <Link href="/users/new">
              <Button variant="primary">
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New User
              </Button>
            </Link>
          </div>

          <Table
            headers={['Name', 'Email', 'Role', 'Status', 'Created At', 'Actions']}
            data={users}
            emptyMessage="No users found. Create your first user to get started."
            renderRow={(user) => (
              <>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(user.status)}>
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    href={`/users/${user.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          />

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.total_pages}
                baseUrl="/users"
              />
            </div>
          )}
        </Card>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, user: null })}
          title="Confirm Delete"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete user{' '}
              <strong>{deleteModal.user?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setDeleteModal({ isOpen: false, user: null })}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
