import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import Example from '../../Pages/Example';

describe('Example Component', () => {
  it('renders default message when no message prop is provided', () => {
    render(<Example />);

    expect(screen.getByText('Inertia.js + React instalado!')).toBeInTheDocument();
    expect(screen.getByText('Funcionando corretamente')).toBeInTheDocument();
  });

  it('renders custom message when message prop is provided', () => {
    const customMessage = 'Custom test message';
    render(<Example message={customMessage} />);

    expect(screen.getByText('Inertia.js + React instalado!')).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    render(<Example />);

    const container = screen.getByText('Inertia.js + React instalado!').parentElement;
    expect(container).toHaveClass('p-4');
  });

  it('applies correct typography classes', () => {
    render(<Example />);

    const title = screen.getByText('Inertia.js + React instalado!');
    const paragraph = screen.getByText('Funcionando corretamente');

    expect(title).toHaveClass('text-2xl', 'font-bold');
    expect(paragraph).toHaveClass('mt-2');
  });
});