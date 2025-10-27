import React from 'react'
import { Head, Link } from '@inertiajs/react'
import TaskForm from '@/Components/TaskForm'

export default function TasksNew({ task, status_options, priority_options }) {
  return (
    <>
      <Head title="Nova Tarefa" />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/tasks"
                className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Nova Tarefa</h1>
            <p className="mt-2 text-gray-600">Crie uma nova tarefa para organizar seu trabalho</p>
          </div>

          {/* Form */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <TaskForm
              task={task}
              statusOptions={status_options}
              priorityOptions={priority_options}
              method="post"
              action="/tasks"
              submitText="Criar Tarefa"
              cancelUrl="/tasks"
            />
          </div>
        </div>
      </div>
    </>
  )
}