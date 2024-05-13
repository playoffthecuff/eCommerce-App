import { useState } from 'react';
import axios from 'axios';

import { Button, Space, Typography } from 'antd';

import styles from './Main.module.css';

const { Link, Title } = Typography;

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
      const response = await axios.get<CountryData[]>('https://codefrondlers.store/jsfe23q4/api/countries');
      const sortedCountries = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
    } catch (error) {
      // console.error('Error fetching countries:', error);
    }
  };

  return (
    <main className={styles.main}>
      <Title level={2}>Main Page</Title>
      <Space>
        <Link href="#/login" className={styles['test-link']}>
          Login Page
        </Link>
        <Link href="#/registration" className={styles['test-link']}>
          Registration Page
        </Link>
      </Space>
      <Button type="primary" htmlType="button" block onClick={handleButtonClick} className={styles['test-button']}>
        TEST BUTTON TO FETCH COUNTRIES
      </Button>
      {countries.length > 0 && (
        <div className="countries-container">
          <h2>List of countries:</h2>
          <ol>
            {countries.map((country) => (
              <li key={country._id}>{country.name}</li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
}

export default Main;
