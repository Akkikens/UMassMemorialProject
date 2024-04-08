import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormComponent from './components/FormComponent/FormComponent';
import Display from './components/Display/Display';
import StartPage from './components/StartPage/StartPage';
import { Entry } from './interface/types';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HeaderComponent from './components/Header/header';

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const savedEntries = localStorage.getItem('entries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [query, setQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ column: keyof Entry | null; direction: 'ascending' | 'descending' | null }>({ column: null, direction: null });
  const [editEntryId, setEditEntryId] = useState<number | null>(null);  // Add this line

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);


const clearSort = () => {
  setSortConfig({ column: null, direction: null });
};

const addOrUpdateEntry = (entryData: Entry | Omit<Entry, 'id'>) => {
  if ('id' in entryData) {
    // Update existing entry
    setEntries(prevEntries => prevEntries.map(entry => entry.id === entryData.id ? { ...entryData } : entry));
  } else {
    // Add new entry with a new ID
    setEntries(prevEntries => [...prevEntries, { ...entryData, id: Date.now() }]);
  }
};

  const deleteEntry = (id: number) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const sortEntries = (field: keyof Entry) => {
    const newDirection = sortConfig.column === field && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setEntries((prevEntries) => {
      const sortedEntries = [...prevEntries].sort((a, b) => {
        if (a[field] < b[field]) return newDirection === 'ascending' ? -1 : 1;
        if (a[field] > b[field]) return newDirection === 'ascending' ? 1 : -1;
        return 0;
      });
      return sortedEntries;
    });
    setSortConfig({ column: field, direction: newDirection });
  };

  // Sorting moved here if needed outside Display component, else keep sort logic in Display
  const displayedEntries = entries.filter((entry) =>
  Object.values(entry).some((value) =>
    value?.toString().toLowerCase().includes(query.toLowerCase())
  )
);

  const cancelEdit = () => {
    setEditEntryId(null); // Clear edit state
  };

  const getEntryToEdit = () => {
    return entries.find(entry => entry.id === editEntryId) || null;
  };

  const editEntry = (editedEntry: Entry) => {
    setEntries(prevEntries =>
      prevEntries.map(entry => 
        entry.id === editedEntry.id ? editedEntry : entry
      )
    );
    setEditEntryId(null); // Reset edit state
  };

  return (
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/app" element={
          <>
            <FormComponent addOrUpdateEntry={addOrUpdateEntry} existingEntry={getEntryToEdit()} />

            <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ margin: '10px 0', padding: '10px', width: '100%', maxWidth: '400px' }}
            />
            <Display
              entries={entries}
              editEntry={editEntry}
              deleteEntry={deleteEntry}
              sortConfig={sortConfig}
              sortEntries={sortEntries}
              clearSort={clearSort}
            />
          </>
        } />
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!); // Assert non-null
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;