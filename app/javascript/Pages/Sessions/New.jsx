import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';

const Login = ({ email, errors }) => {
  const { data, setData, post, processing, errors: formErrors } = useForm({
    email: email || '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <Layout>
      <Head title="Login" />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                go back to home
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errors && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="text-sm text-red-800">
                  {Array.isArray(errors) ? errors.join(', ') : errors}
                </div>
              </div>
            )}

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot_password"
                  method="post"
                  as="button"
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={(e) => {
                    e.preventDefault();
                    // Show forgot password modal or redirect
                    const email = prompt('Enter your email address:');
                    if (email) {
                      const form = document.createElement('form');
                      form.method = 'POST';
                      form.action = '/forgot_password';
                      form.style.display = 'none';

                      const emailInput = document.createElement('input');
                      emailInput.type = 'hidden';
                      emailInput.name = 'email';
                      emailInput.value = email;
                      form.appendChild(emailInput);

                      document.body.appendChild(form);
                      form.submit();
                    }
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;