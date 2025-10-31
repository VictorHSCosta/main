import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';
import Layout from '../../Components/Layout';

// Mock do Inertia.js Link
jest.mock('@inertiajs/react', () => ({
  Link: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

describe('Layout Component', () => {
  beforeEach(() => {
    // Reset mock media queries before each test
    window.matchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('renders layout with basic structure', () => {
    render(<Layout><div>Test Content</div></Layout>);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows login button when user is not authenticated', () => {
    render(<Layout><div>Content</div></Layout>);

    const loginButton = screen.getByRole('link', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', '/login');
  });

  it('shows user info and logout button when authenticated', () => {
    const auth = {
      user: {
        name: 'John Doe',
        role: 'admin'
      }
    };

    render(<Layout auth={auth}><div>Content</div></Layout>);

    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument();
  });

  it('displays flash messages when provided', () => {
    const flash = {
      success: 'Success message',
      error: 'Error message',
      notice: 'Notice message',
      alert: 'Alert message'
    };

    render(<Layout flash={flash}><div>Content</div></Layout>);

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Notice message')).toBeInTheDocument();
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    render(<Layout><div>Content</div></Layout>);

    const nav = screen.getByRole('navigation');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    // Check for responsive Tailwind classes
    expect(nav).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    expect(main).toHaveClass('sm:px-6', 'lg:px-8');
    expect(footer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
  });

  it('handles mobile viewport correctly', () => {
    // Mock mobile viewport
    window.matchMedia.mockImplementation(query => ({
      matches: query === '(max-width: 640px)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const auth = {
      user: {
        name: 'John Doe',
        role: 'admin'
      }
    };

    render(<Layout auth={auth}><div>Content</div></Layout>);

    // In mobile, navigation should still be accessible
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    // User info should still be visible
    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
  });
});