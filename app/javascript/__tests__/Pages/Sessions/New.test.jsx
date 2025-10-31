import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import Login from '../../../Pages/Sessions/New';

// Mock do Inertia.js
jest.mock('@inertiajs/react', () => ({
  Head: ({ children }) => <head>{children}</head>,
  Link: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
  useForm: () => ({
    data: { email: 'test@example.com', password: '' },
    setData: jest.fn(),
    post: jest.fn(),
    processing: false,
    errors: {}
  })
}));

// Mock do Layout
jest.mock('../../../Components/Layout', () => {
  return function MockLayout({ children }) {
    return <div data-testid="layout">{children}</div>;
  };
});

// Mock do window.prompt
const mockPrompt = jest.fn();
Object.defineProperty(window, 'prompt', {
  value: mockPrompt,
  writable: true,
});

describe('Login Component', () => {
  beforeEach(() => {
    mockPrompt.mockClear();

    // Mock de formulário dinâmico
    document.body.innerHTML = '';
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
  });

  it('renders login form correctly', () => {
    render(<Login />);

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    render(<Login />);

    const container = screen.getByRole('main') || screen.getByTestId('layout').querySelector('.min-h-screen');

    // Verificar classes responsivas do Tailwind
    expect(screen.getByText('Sign in to your account').closest('.mt-6')).toHaveClass('text-center');

    // Verificar se o formulário tem classes responsivas
    const form = screen.getByRole('form') || document.querySelector('form');
    if (form) {
      expect(form).toHaveClass('space-y-6');
    }
  });

  it('has mobile-friendly input fields', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Verificar se os inputs são mobile-friendly
    expect(emailInput).toHaveClass('appearance-none', 'relative', 'block', 'w-full');
    expect(passwordInput).toHaveClass('appearance-none', 'relative', 'block', 'w-full');

    // Verificar autocomplete para mobile
    expect(emailInput).toHaveAttribute('autoComplete', 'email');
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
  });

  it('displays error messages when provided', () => {
    const errors = ['Invalid credentials'];
    render(<Login errors={errors} />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('handles forgot password click', () => {
    mockPrompt.mockReturnValue('test@example.com');

    render(<Login />);

    const forgotPasswordLink = screen.getByText('Forgot your password?');
    fireEvent.click(forgotPasswordLink);

    expect(mockPrompt).toHaveBeenCalledWith('Enter your email address:');
  });

  it('has touch-friendly button sizes', () => {
    render(<Login />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Verificar se o botão é touch-friendly
    expect(submitButton).toHaveClass('w-full', 'py-2', 'px-4');
  });

  it('handles form submission', () => {
    const mockPost = jest.fn();
    jest.mock('@inertiajs/react', () => ({
      Head: ({ children }) => <head>{children}</head>,
      Link: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
      useForm: () => ({
        data: { email: '', password: '' },
        setData: jest.fn(),
        post: mockPost,
        processing: false,
        errors: {}
      })
    }));

    render(<Login />);

    const form = screen.getByRole('form') || document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
      expect(mockPost).toHaveBeenCalledWith('/login');
    }
  });

  it('has proper responsive container', () => {
    render(<Login />);

    // Verificar se o container principal é responsivo
    const container = screen.getByText('Sign in to your account').closest('.min-h-screen');
    if (container) {
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    }
  });
});