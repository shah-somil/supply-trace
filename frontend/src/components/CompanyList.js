import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Collapse, Badge } from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

// State abbreviation mapping
const stateAbbreviations = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
};

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    state: '',
  });
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/companies/');
        setCompanies(response.data);
        setFilteredCompanies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Failed to fetch companies');
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const results = companies.filter(company => {
      const addressLower = company.address.toLowerCase();
      const matchesSearchQuery = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        addressLower.includes(searchQuery.toLowerCase());

      const matchesFilters = (!selectedFilters.state || 
        addressLower.includes(selectedFilters.state.toLowerCase()));

      return matchesSearchQuery && matchesFilters;
    });
    setFilteredCompanies(results);
  }, [searchQuery, selectedFilters, companies]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterToggle = () => {
    setShowFilters(prevState => !prevState);
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        [key]: value,
      };

      // Update applied filters
      const updatedFilters = Object.entries(newFilters).reduce((acc, [filterKey, filterValue]) => {
        if (filterValue) acc.push({ key: filterKey, value: filterValue });
        return acc;
      }, []);

      setAppliedFilters(updatedFilters);
      return newFilters;
    });
  };

  const removeFilter = (filterKey) => {
    const newFilters = { ...selectedFilters, [filterKey]: '' };
    handleFilterChange(filterKey, '');
    setSelectedFilters(newFilters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <header className="hero bg-light p-4 mb-4 rounded">
        <h1 className="display-4">Company List</h1>
        <div className="d-flex flex-column flex-md-row align-items-center mt-4">
          <input
            type="text"
            className="form-control me-md-2 mb-2 mb-md-0"
            placeholder="Search by name or address"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={handleFilterToggle}
          >
            <FaFilter /> Filter
          </Button>
        </div>
        <Collapse in={showFilters}>
          <div className="mt-3">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="outline-primary">
                State
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleFilterChange('state', '')}>All</Dropdown.Item>
                {Object.keys(stateAbbreviations).map((state, index) => (
                  <Dropdown.Item key={index} onClick={() => handleFilterChange('state', stateAbbreviations[state])}>
                    {state}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Collapse>
        <div className="mt-3">
          {appliedFilters.length > 0 && (
            <div className="d-flex flex-wrap">
              {appliedFilters.map(filter => (
                <Badge
                  key={filter.key}
                  pill
                  bg="info"
                  className="me-2 mb-2"
                >
                  {filter.key.charAt(0).toUpperCase() + filter.key.slice(1)}: {filter.value}
                  <FaTimes
                    className="ms-2"
                    onClick={() => removeFilter(filter.key)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>
      <main>
        <ul className="list-unstyled">
          {filteredCompanies.map((company) => (
            <li key={company.company_id} className="mb-3 p-3 border rounded">
              <h3>{company.name}</h3>
              <p>{company.address}</p>
              <Link to={`/companies/${company.company_id}`} className="btn btn-primary">View Details</Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="mt-4 text-center">
        <p>&copy; {new Date().getFullYear()} Your Company Name</p>
      </footer>
    </div>
  );
};

export default CompanyList;
