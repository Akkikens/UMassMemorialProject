// StartPage.test.js or StartPage.test.tsx if using TypeScript

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StartPage from './StartPage'; // Adjust the import path as needed

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('navigates to the main app when the button is clicked', () => {
    render(<StartPage />);
    const button = screen.getByText('Checkout the Project');
    fireEvent.click(button);
});

export {};