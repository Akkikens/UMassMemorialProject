import React from 'react';
import { Table, Button } from 'semantic-ui-react';

function Display({ entries, deleteEntry, sortEntries }) {
  const [sortColumn, setSortColumn] = React.useState(null);
  const [direction, setDirection] = React.useState(null);

  const handleSort = (clickedColumn) => {
    if (sortColumn !== clickedColumn) {
      setSortColumn(clickedColumn);
      setDirection('ascending');
      sortEntries(clickedColumn, true);
      return;
    }

    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    sortEntries(clickedColumn, direction === 'descending');
  };

  return (
    <Table sortable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={sortColumn === 'firstName' ? direction : null}
            onClick={() => handleSort('firstName')}>
            First Name
          </Table.HeaderCell>
          {/* Repeat for other headers */}
          <Table.HeaderCell>
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {entries.map((entry) => (
          <Table.Row key={entry.id}>
            <Table.Cell>{entry.firstName}</Table.Cell>
            {/* Repeating for other cells */}
            <Table.Cell>
              <Button color='red' onClick={() => deleteEntry(entry.id)}>Delete</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
