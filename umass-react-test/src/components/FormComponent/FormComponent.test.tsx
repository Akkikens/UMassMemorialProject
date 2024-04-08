import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormComponent from './FormComponent'; // Adjust the import path as needed

test('renders the form component', () => {
    render(<FormComponent addEntry={jest.fn()} />);
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
  });
  
  

  test('allows the user to enter text in the input fields', () => {
    render(<FormComponent addEntry={() => {}} />);
    const firstNameInput = screen.getByPlaceholderText('First Name') as HTMLInputElement;
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });
  

// Before using the value property, assert that the element is an HTMLInputElement
const firstNameInput = screen.getByPlaceholderText('First Name') as HTMLInputElement;
fireEvent.change(firstNameInput, { target: { value: 'John' } });
expect(firstNameInput.value).toBe('John');

export {};