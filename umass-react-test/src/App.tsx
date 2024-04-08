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
  // Initialize state with data from localStorage, or empty array if none
  const [entries, setEntries] = useState<Entry[]>(() => {
    const savedEntries = localStorage.getItem('entries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [query, setQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ column: keyof Entry | null; direction: 'ascending' | 'descending' | null }>({ column: null, direction: null });

  useEffect(() => {
    // Update localStorage whenever entries change
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const clearSort = () => {
    setSortConfig({ column: null, direction: null });
  };

  const addEntry = (entry: Omit<Entry, 'id'>) => {
    setEntries((prevEntries) => [...prevEntries, { ...entry, id: Date.now() }]);
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
    Object.values(entry).some((value) => value.toString().toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/app" element={
          <div>
            <HeaderComponent/>
            <FormComponent addEntry={addEntry} />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ margin: '10px 0', padding: '10px', width: '100%', maxWidth: '400px' }}
            />
            <Display
              entries={displayedEntries}
              deleteEntry={deleteEntry}
              sortConfig={sortConfig}
              sortEntries={sortEntries}
              clearSort={clearSort}
            />
          </div>
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
