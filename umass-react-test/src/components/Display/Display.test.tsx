import React from 'react';
import { render, screen } from '@testing-library/react';
import Display from './Display'; // Adjust the import path as needed
import { Entry } from '../../interface/types'; // Adjust the import path as needed

// Since Display component requires props, we'll have to mock them
const mockEntries: Entry[] = [
  // Mock data that matches the shape of Entry
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthday: '1990-01-01', bloodGroup: 'A+' },
  // Add more mock entries as needed
];

const mockDeleteEntry = jest.fn();
const mockSortEntries = jest.fn();
const mockSortConfig = { column: null, direction: null as 'ascending' | 'descending' | null };
const mockClearSort = jest.fn();

test('renders the Display component', () => {
  render(
    <Display 
      entries={mockEntries} 
      deleteEntry={mockDeleteEntry} 
      sortEntries={mockSortEntries} 
      sortConfig={mockSortConfig}
      clearSort={mockClearSort} 
    />
  );
  // Assertions can follow here, for example:
  expect(screen.getByText('John')).toBeInTheDocument();
});

// To make this file a module, export something, or just an empty export
export {};
