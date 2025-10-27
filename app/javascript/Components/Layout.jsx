import React from 'react';
import { Link } from '@inertiajs/react';

const Layout = ({ children, auth }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  User Management
                </Link>
              </div>
              {auth?.user && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                  >
                    Users
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {auth?.user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Welcome, {auth.user.name}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {auth.user.role}
                  </span>
                  <Link
                    href="/logout"
                    method="delete"
                    as="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Flash Messages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {props.flash?.success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <div className="text-sm text-green-800">{props.flash.success}</div>
          </div>
        )}
        {props.flash?.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="text-sm text-red-800">{props.flash.error}</div>
          </div>
        )}
        {props.flash?.notice && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <div className="text-sm text-blue-800">{props.flash.notice}</div>
          </div>
        )}
        {props.flash?.alert && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <div className="text-sm text-yellow-800">{props.flash.alert}</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 User Management System. Built with Rails, React & Inertia.js.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;