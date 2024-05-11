import { useState } from 'react';
import axios from 'axios';

import { Button } from 'antd';

interface CountryData {
  abbrev: string;
  name: string;
  _id: string;
  postalCodePattern: string;
  postalRegex: string;
}

function Main() {
  const [countries, setCountries] = useState<CountryData[]>([]);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get<CountryData[]>('http://localhost:3000/api/countries');
      const sortedCountries = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
    } catch (error) {
      // console.error('Error fetching countries:', error);
    }
  };

  return (
    <main>
      Main
      <Button type="primary" htmlType="button" block onClick={handleButtonClick}>
        TEST BUTTON TO FETCH COUNTRIES
      </Button>
      {countries.length > 0 && (
        <div className="countries-container">
          <h2>List of countries:</h2>
          <ol>
            {countries.map((country) => (
              // eslint-disable-next-line no-underscore-dangle
              <li key={country._id}>{country.name}</li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}

export default Main;