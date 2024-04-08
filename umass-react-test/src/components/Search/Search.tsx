import React, { useState } from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';

const SearchBarWithButton = ({ query, setQuery }: { query: string, setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
      <div className="search-bar-with-button">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ margin: '10px 0', padding: '10px', width: 'calc(100% - 100px)', display: 'inline-block' }}
        />
        <button type="button" className="btn btn-danger"
          onClick={() => {/* potentially trigger a search */}}
          style={{ padding: '10px', width: '100px', display: 'inline-block' }}
        >
          Search
        </button>
      </div>
    );
  };
  

export default SearchBarWithButton;
