import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);

  const submitButton = screen.getByText(/submit/i); // Regex for case-insensitive match
  expect(submitButton).toBeInTheDocument();

});