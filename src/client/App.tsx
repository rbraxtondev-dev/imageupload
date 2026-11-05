import "./App.css";

import { useState, useEffect } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([])

  async function getImages(searchParam?: string) {
    const url = `http://localhost:3000/images${searchParam && "/" + searchParam}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getImages();
  }, [])

  return (
    <div className="App">
      <input placeholder="search"></input>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
