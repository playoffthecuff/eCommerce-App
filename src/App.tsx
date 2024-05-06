// import { useState } from 'react';
import './App.css';
import LoginForm from './components/login-form/login-form';

function App() {
  // const [count, setCount] = useState(0);
  return (
    <>
      {/* <h1>Hello Team!</h1>
      <button type="button" onClick={() => setCount((prevCount) => prevCount + 1)}>
        count is {count}
      </button> */}
      <LoginForm />
    </>
  );
}

export default App;
