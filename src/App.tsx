import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Hello Team!</h1>
      <button type="button" onClick={() => setCount((prevCount) => prevCount + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default App;
