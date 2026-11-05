import "./App.css";

import { useState, useEffect } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  async function getImages(searchParam?: string) {
    const url = `http://localhost:3000/images${searchParam ? `/${searchParam}` : ""}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setImages(result);
      console.log(result);
    } catch (error) {
      // console.error(error.message);
    }
  }

  //add debounce
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  useEffect(() => {
    getImages(inputValue);
  }, [inputValue])

  return (
    <div className="App">
      <input placeholder="search" onChange={handleInputChange}></input>
      <div>{inputValue}</div>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {images.map(a => (<img src={`/uploads/${a}`} />))}
    </div>
  );
}

export default App;
