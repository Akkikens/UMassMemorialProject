import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change here
import FormComponent from './components/FormComponent';
import Display from './components/Display';
import './App.css';
import StartPage from './components/StartPage';
import 'semantic-ui-css/semantic.min.css';
import { Entry } from './interface/types';


const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ column: keyof Entry | null; direction: 'ascending' | 'descending' | null }>({ column: null, direction: null });

  const clearSort = () => {
    setSortConfig({ column: null, direction: null });
  };

  const addEntry = (entry: Omit<Entry, 'id'>) => {
    setEntries([...entries, { ...entry, id: Date.now() }]);
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const sortEntries = (field: keyof Entry) => {
    const isAscending = sortConfig.column === field && sortConfig.direction === 'ascending';
    const newDirection = isAscending ? 'descending' : 'ascending';
    const sortedEntries = [...entries].sort((a, b) => {
      if (a[field] < b[field]) return newDirection === 'ascending' ? -1 : 1;
      if (a[field] > b[field]) return newDirection === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortConfig({ column: field, direction: newDirection });
    setEntries(sortedEntries);
  };

  const filteredEntries = query === '' ? entries : entries.filter((entry) =>
    Object.values(entry).some((value) => value.toString().toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<StartPage />} />
        <Route path="/app" element={
    <div>
      <FormComponent addEntry={addEntry} />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ margin: '10px 0', padding: '10px', width: '100%', maxWidth: '400px' }}
      />
      <Display
        entries={filteredEntries}
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
const root = ReactDOM.createRoot(rootElement!); // Non-null assertion if you're sure the element exists
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
