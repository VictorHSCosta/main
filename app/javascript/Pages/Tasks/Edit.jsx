import React from 'react'
import { Head, Link } from '@inertiajs/react'
import TaskForm from '@/Components/TaskForm'

export default function TasksEdit({ task, status_options, priority_options }) {
  return (
    <>
      <Head title={`Editar Tarefa: ${task.title}`} />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href={`/tasks/${task.id}`}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Tarefa</h1>
            <p className="mt-2 text-gray-600">Atualize as informações da tarefa</p>
          </div>

          {/* Form */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <TaskForm
              task={task}
              statusOptions={status_options}
              priorityOptions={priority_options}
              method="patch"
              action={`/tasks/${task.id}`}
              submitText="Atualizar Tarefa"
              cancelUrl={`/tasks/${task.id}`}
            />
          </div>
        </div>
      </div>
    </>
  )
}