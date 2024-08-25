import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './index.css';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highestLowercase', label: 'Highest lowercase alphabet' },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post('https://bajaj-api-abbas.onrender.com/', parsedData);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON or API error');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const filterResponse = () => {
    if (!response || selectedOptions.length === 0) return response;

    let filteredData = {};

    selectedOptions.forEach((option) => {
      switch (option.value) {
        case 'alphabets':
          filteredData.alphabets = response.alphabets;
          break;
        case 'numbers':
          filteredData.numbers = response.numbers;
          break;
        case 'highestLowercase':
          filteredData.highestLowercase = response.highestLowercase;
          break;
        default:
          break;
      }
    });

    return filteredData;
  };

  return (
    <div>
      <div className="section section-1">
        <div className="container">
          <h1>JSON Processor UI</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={jsonInput}
              onChange={handleInputChange}
              placeholder="Enter your JSON here"
              className="json-textarea"
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {response && (
            <div>
              <h2>Select Options to Filter</h2>
              <Select
                isMulti
                options={options}
                onChange={handleSelectChange}
              />
              <div>
                <h2>Filtered Response</h2>
                <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
