import "./App.css";

import Navbar from "./components/Navbar"

import { useState, useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const getImages = async (searchParam?: string) => {
    const url = `http://localhost:3000/images${searchParam ? `/${searchParam}` : ""}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setImages(result);
    } catch (error) {
      // console.error(error.message);
    }
  }

  const deleteImage = async (imageName: string) => {
    const url = `http://localhost:3000/delete/${imageName}`;
    const response = await fetch(url, { method: "POST" }).then(() => {
      getImages(inputValue)
    });
  }

  //TODO: add debounce
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  useEffect(() => {
    getImages(inputValue);
  }, [inputValue])

  return (
    <div className="App">
      <Navbar setSearchTerm={handleInputChange} />
      <div>{inputValue}</div>


      {images.map(a => (<div>
        <img src={`/uploads/${a}`} />
        <button onClick={() => deleteImage(a)}>Delete</button>
      </div>))}
    </div>
  );
}

export default App;
