import "./App.css";

import { useState, useEffect } from "react";

import { Grid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import Navbar from "./components/Navbar"
import ImageCard from "./components/ImageCard";
import UploadModal from "./components/UploadModal";
import { BASE_URL } from "./constants/constants"

function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);


  const getImages = async (searchParam?: string) => {
    const url = `${BASE_URL}/images${searchParam ? `/${searchParam}` : ""}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setImages(result);

    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      notifications.show({
        title: "Error fetching images",
        message: `Error: ${message}`,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const refreshImages = () => {
    getImages(inputValue);
  }

  const deleteImage = async (imageName: string) => {
    const url = `${BASE_URL}/delete/${imageName}`;
    try {
      const response = await fetch(url, { method: "POST" });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      getImages(inputValue);

      notifications.show({
        title: "Deletion successful",
        message: `${imageName} has been deleted.`,
      });
    } catch (error) {
      notifications.show({
        title: "error",
        message: `${imageName} could not be deleted. Error: ${error}`,
      });
    }
  };

  //useEffect hook to set a timeout for debounce. Every time value changes, previous timeout is cancelled
  useEffect(() => {
    const timeoutId = setTimeout(() => refreshImages(), 100);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <div className="App">
      <Navbar setSearchTerm={handleInputChange} searchTerm={inputValue} openModal={openModal} />
      <Text size="xl" fw={500} style={{ marginBottom: "24px", textAlign: "left" }}>
        {`${images.length} images`}
      </Text>
      <Grid>
        {images.map(imgPath => (
          <Grid.Col key={imgPath} span={6}>
            <ImageCard image={imgPath} deleteFn={deleteImage} />
          </Grid.Col>
        ))}
      </Grid>
      <UploadModal opened={isModalOpen} open={openModal} close={closeModal} getImages={refreshImages} />
    </div>
  );
}

export default App;