import React, { useState } from 'react';
import Form from './Form';
import Display from './Display';
import './App.css'; 
import 'semantic-ui-css/semantic.min.css';
import { Button, Form as SemanticForm, Input } from 'semantic-ui-react';


function App() {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');

  const addEntry = (entry) => {
    setEntries([...entries, { ...entry, id: Date.now() }]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // Sort entries by a field in ascending or descending order manually
  const sortEntries = (field, ascending = true) => {
    const sortedEntries = [...entries].sort((a, b) => {
      if (a[field] < b[field]) return ascending ? -1 : 1;
      if (a[field] > b[field]) return ascending ? 1 : -1;
      return 0;
    });
    setEntries(sortedEntries);
  };

  const filteredEntries = entries.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div>
      <Form addEntry={addEntry} />
      <Input
        icon="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Display
        entries={filteredEntries}
        deleteEntry={deleteEntry}
        sortEntries={sortEntries}
      />
    </div>
  );
}

export default App;


