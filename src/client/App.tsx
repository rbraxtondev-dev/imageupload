import "./App.css";

import Navbar from "./components/Navbar"
import ImageCard from "./components/ImageCard";
import UploadModal from "./components/UploadModal";
import { Grid } from '@mantine/core';


import { useState, useEffect } from "react";
import { useDisclosure } from '@mantine/hooks';


function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [opened, { open, close }] = useDisclosure(false);


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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const refreshImages = () => {
    getImages(inputValue);
  }

  useEffect(() => {
    refreshImages();
  }, [inputValue])

  return (
    <div className="App">
      <Navbar setSearchTerm={handleInputChange} searchTerm={inputValue} openModal={open} />
      <div>{inputValue}</div>

      {`${images.length} images`}
      <Grid>
        {images.map(imgPath => (
          <Grid.Col span={4}>
            <ImageCard image={imgPath} deleteFn={deleteImage} />
          </Grid.Col>
        ))}
        {/* <div>
          <img src={`/uploads/${a}`} />
          <button onClick={() => deleteImage(a)}>Delete</button>
        </div> */}
      </Grid>


      <UploadModal opened={opened} open={open} close={close} getImages={refreshImages} />
    </div>
  );
}

export default App;
