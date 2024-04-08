import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Entry } from '../interface/types'; 

interface DisplayProps {
  entries: Entry[];
  deleteEntry: (id: number) => void;
  sortEntries: (field: keyof Entry) => void;
  sortConfig: { 
    column: keyof Entry | null; 
    direction: "ascending" | "descending" | null; 
  };
  clearSort: () => void; // clearing the sort and also for the icon clear
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = `0${date.getMonth() + 1}`.slice(-2); 
  const day = `0${date.getDate()}`.slice(-2); 
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const Display: React.FC<DisplayProps> = ({ entries, deleteEntry, sortEntries, sortConfig, clearSort }) => {
  // Render Sort fn
  const renderSortIcon = (field: keyof Entry) => {
    if (sortConfig.column === field) {
      return sortConfig.direction === 'ascending' ? <Icon name='caret up' /> : <Icon name='caret down' />;
    }
    return null; // No icon if not currently sorted by this column
  };

  return (
    <div>
    <Table sortable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell onClick={() => sortEntries('firstName')}>
            First Name {renderSortIcon('firstName')}
          </Table.HeaderCell>
          <Table.HeaderCell onClick={() => sortEntries('lastName')}>
            Last Name {renderSortIcon('lastName')}
          </Table.HeaderCell>
          <Table.HeaderCell onClick={() => sortEntries('email')}>
            Email {renderSortIcon('email')}
          </Table.HeaderCell>
          <Table.HeaderCell onClick={() => sortEntries('birthday')}>
            Birthday {renderSortIcon('birthday')}
          </Table.HeaderCell>
          <Table.HeaderCell onClick={() => sortEntries('bloodGroup')}>
            Blood Group {renderSortIcon('bloodGroup')}
          </Table.HeaderCell>
          <Table.HeaderCell>
            Action
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {entries.map((entry) => (
          <Table.Row key={entry.id}>
            <Table.Cell>{entry.firstName}</Table.Cell>
            <Table.Cell>{entry.lastName}</Table.Cell>
            <Table.Cell>{entry.email}</Table.Cell>
            <Table.Cell>{formatDate(entry.birthday)}</Table.Cell>
            <Table.Cell>{entry.bloodGroup}</Table.Cell>
            <Table.Cell>
              <Button color='red' onClick={() => deleteEntry(entry.id)}>Delete</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Button onClick={clearSort} color="blue">Clear Sort</Button>
    </div>
  );
};

export default Display;