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
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col" onClick={() => sortEntries('firstName')}>First Name {renderSortIcon('firstName')}</th>
            <th scope="col" onClick={() => sortEntries('lastName')}>Last Name {renderSortIcon('lastName')}</th>
            <th scope="col" onClick={() => sortEntries('email')}>Email {renderSortIcon('email')}</th>
            <th scope="col" onClick={() => sortEntries('birthday')}>Birthday {renderSortIcon('birthday')}</th>
            <th scope="col" onClick={() => sortEntries('bloodGroup')}>Blood Group {renderSortIcon('bloodGroup')}</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.firstName}</td>
              <td>{entry.lastName}</td>
              <td>{entry.email}</td>
              <td>{formatDate(entry.birthday)}</td>
              <td>{entry.bloodGroup}</td>
              <td>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-primary" onClick={() => handleEdit(entry)}>Edit</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteEntry(entry.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-info" onClick={clearSort}>Clear Sort</button>

      {/* Assuming Modal is a custom or third-party component that already styles itself appropriately */}
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>Edit Entry</Modal.Header>
        <Modal.Content>
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" name='firstName' value={editedEntry?.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" name='lastName' value={editedEntry?.lastName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" name='email' value={editedEntry?.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input className="form-control" type='date' name='birthday' value={editedEntry?.birthday} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <select 
              className="form-control" 
              name="bloodGroup" 
              value={editedEntry?.bloodGroup || ''} 
              onChange={(e) => setEditedEntry({ ...editedEntry!, bloodGroup: e.target.value })}
            >
              {bloodGroupOptions.map(option => (
                <option key={option.key} value={option.value}>{option.text}</option>
              ))}
            </select>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          <button className="btn btn-success" onClick={handleSave}>Save</button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};


export default Display;