import React, { useEffect } from 'react'
import { router } from '@inertiajs/react'
import TaskForm from './TaskForm'

export default function TaskModal({ show, onClose, task, statusOptions, priorityOptions }) {
  const isEditing = !!task?.id

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (show) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [show, onClose])

  if (!show) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    if (isEditing) {
      router.patch(`/tasks/${task.id}`, data, {
        onSuccess: () => {
          onClose()
          // Show success message via flash (handled by Inertia)
        },
        onError: (errors) => {
          // Errors will be handled by the form component
        }
      })
    } else {
      router.post('/tasks', data, {
        onSuccess: () => {
          onClose()
          // Show success message via flash (handled by Inertia)
        },
        onError: (errors) => {
          // Errors will be handled by the form component
        }
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg bg-white rounded-lg shadow-xl transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <TaskForm
              task={task || {}}
              statusOptions={statusOptions}
              priorityOptions={priorityOptions}
              method={isEditing ? 'patch' : 'post'}
              action={isEditing ? `/tasks/${task.id}` : '/tasks'}
              submitText={isEditing ? 'Atualizar Tarefa' : 'Criar Tarefa'}
              cancelUrl="#"
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  )
}