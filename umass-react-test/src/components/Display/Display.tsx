import React from 'react';
import { Table, Button, Icon, Modal, Form, Select } from 'semantic-ui-react';
import { Entry } from '../../interface/types';

interface DisplayProps {
  entries: Entry[];
  editEntry: (entry: Entry) => void;
  deleteEntry: (id: number) => void;
  sortEntries: (field: keyof Entry) => void;
  sortConfig: { 
    column: keyof Entry | null; 
    direction: "ascending" | "descending" | null; 
  };
  clearSort: () => void;
}

const bloodGroupOptions = [
  { key: 'a+', value: 'A+', text: 'A+' },
  { key: 'a-', value: 'A-', text: 'A-' },
  { key: 'b+', value: 'B+', text: 'B+' },
  { key: 'b-', value: 'B-', text: 'B-' },
  { key: 'ab+', value: 'AB+', text: 'AB+' },
  { key: 'ab-', value: 'AB-', text: 'AB-' },
  { key: 'o+', value: 'O+', text: 'O+' },
  { key: 'o-', value: 'O-', text: 'O-' },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = `0${date.getMonth() + 1}`.slice(-2); 
  const day = `0${date.getDate()}`.slice(-2); 
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const Display: React.FC<DisplayProps> = ({ entries, editEntry, deleteEntry, sortEntries, sortConfig, clearSort }) => {
  const [open, setOpen] = React.useState(false);
  const [editedEntry, setEditedEntry] = React.useState<Entry | null>(null);

  const handleEdit = (entry: Entry) => {
    setEditedEntry(entry);
    setOpen(true);
  };

  const handleClose = () => {
    setEditedEntry(null);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEntry(prevState => ({
      ...prevState!,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (editedEntry) {
      editEntry(editedEntry); 
      setOpen(false);
    }
  };

  const renderSortIcon = (field: keyof Entry) => {
    if (sortConfig.column === field) {
      return sortConfig.direction === 'ascending' ? <Icon name='caret up' /> : <Icon name='caret down' />;
    }
    return null;
  };

  return (
    <div>
      <Table sortable celled color='teal' striped>
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
                <Button.Group>
                  <Button color='blue' onClick={() => handleEdit(entry)}>Edit</Button>
                  <Button color='red' onClick={() => deleteEntry(entry.id)}>Delete</Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button onClick={clearSort} color="blue">Clear Sort</Button>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>Edit Entry</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input name='firstName' value={editedEntry?.firstName} onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input name='lastName' value={editedEntry?.lastName} onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input name='email' value={editedEntry?.email} onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Birthday</label>
              <input type='date' name='birthday' value={editedEntry?.birthday} onChange={handleChange} />
            </Form.Field>
            <Form.Field
          control={Select}
          label="Blood Group"
          options={bloodGroupOptions}
          placeholder="Select Blood Group"
          name="bloodGroup"
          value={editedEntry?.bloodGroup || ''}
          onChange={(_: React.ChangeEvent<HTMLInputElement>, { value }: any) => setEditedEntry({ ...editedEntry!, bloodGroup: value })}
        />
      </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            content="Save"
            labelPosition='right'
            icon='checkmark'
            onClick={handleSave}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Display;