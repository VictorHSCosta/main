import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const Layout = ({ children, auth, flash }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            {/* Logo and Main Navigation */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              {auth?.user && (
                <button
                  type="button"
                  className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={toggleMobileMenu}
                  aria-controls="mobile-menu"
                  aria-expanded={mobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Menu icon */}
                  <svg
                    className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {/* Close icon */}
                  <svg
                    className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {/* Logo */}
              <div className="flex-shrink-0 flex items-center ml-2 sm:ml-0">
                <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900">
                  User Management
                </Link>
              </div>

              {/* Desktop Navigation */}
              {auth?.user && (
                <div className="hidden lg:flex lg:ml-6 lg:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                  >
                    Users
                  </Link>
                </div>
              )}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden sm:flex items-center">
              {auth?.user ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-xs sm:text-sm text-gray-700">
                    Welcome, {auth.user.name}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {auth.user.role}
                  </span>
                  <Link
                    href="/logout"
                    method="delete"
                    as="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium min-w-0 touch-manipulation"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium touch-manipulation"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile User Actions */}
            {auth?.user && (
              <div className="flex sm:hidden items-center">
                <Link
                  href="/logout"
                  method="delete"
                  as="button"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-xs font-medium touch-manipulation"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {auth?.user && mobileMenuOpen && (
          <>
            {/* Mobile menu overlay */}
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25" onClick={closeMobileMenu}></div>

            {/* Mobile menu panel */}
            <div className="lg:hidden fixed top-0 left-0 bottom-0 w-64 max-w-[80vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between h-14 sm:h-16 px-4 border-b border-gray-200">
                <Link href="/" className="text-lg font-bold text-gray-900" onClick={closeMobileMenu}>
                  User Management
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={closeMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="mt-5 px-2 space-y-1">
                <Link
                  href="/"
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  onClick={closeMobileMenu}
                >
                  Users
                </Link>
              </nav>

              {/* Mobile User Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 px-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {auth.user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {auth.user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {auth.user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Flash Messages */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-3 sm:mt-4">
        {flash?.success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-green-800">{flash.success}</div>
          </div>
        )}
        {flash?.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-red-800">{flash.error}</div>
          </div>
        )}
        {flash?.notice && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-blue-800">{flash.notice}</div>
          </div>
        )}
        {flash?.alert && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="text-xs sm:text-sm text-yellow-800">{flash.alert}</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-3 sm:py-4 px-2 sm:px-4 lg:px-8">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            © 2024 User Management System. Built with Rails, React & Inertia.js.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;