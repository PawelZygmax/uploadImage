import { useRef, useState } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { v4 as uuidv4 } from "uuid";

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dfeaf9;
`;

const Container = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.11);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropZone = styled.div`
  border-radius: 30px;
  background-color: #dfeaf9;
  height: 240px;
  width: 440px;
  position: relative;
  padding: 20px;
  display: flex;
`;

const BrowseFilesButton = styled.button`
  outline: none;
  border: none;
  background-color: #4453f9;
  padding: 15px 30px;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: background-color 0.2s 0s, box-shadow 0.2s 0s;

  &:hover {
    background-color: #313ecc;
  }

  &:active {
    background-color: #1e2bb3;
    box-shadow: inset 1px 0px 13px 8px rgba(0, 0, 0, 0.13);
  }
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 15px;
  border: 1px solid #4453f9;
  background-image: ${(props) => `url(${props.url})`};
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:first-child) {
    margin-left: 10px;
  }
`;

function ThumbnailsList(props) {
  const { thumbnails, handleRemoveMediaClick } = props;

  return (
    <>
      {(thumbnails || []).map((item) => (
        <Thumbnail
          key={item.id}
          url={item.src}
          onClick={() => handleRemoveMediaClick(item.id)}
        >
          {item.isUploading && <Spinner />}
        </Thumbnail>
      ))}
    </>
  );
}

const stop = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

function App() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleBrowseFilesButtonClick = (e) => {
    stop(e);
    fileInputRef.current.click();
  };

  const handleRemoveMediaClick = (id) => {
    setFiles(files.filter((file) => file.id !== id));
    fileInputRef.current.value = "";
  };

  const inputFileOnChange = async () => {
    const fileInput = fileInputRef.current;
    const inputFiles = [...fileInput.files];
    fileInputRef.current.value = "";

    inputFiles.forEach((file) => {
      const item = { isUploading: true, src: null, id: uuidv4() };
      setFiles((prev) => [...prev, item]);
      readFile(file, item.id);
    });
  };

  const readFile = (file, id) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const src = reader.result;
      setFiles((prev) => {
        const newState = [...prev];
        const loadedItem = newState.find((item) => item.id === id);
        loadedItem.isUploading = false;
        loadedItem.src = src;
        return newState;
      });
    });
    reader.readAsDataURL(file);
  };

  return (
    <div className="App">
      <MainWrapper>
        <Container>
          <DropZone>
            <ThumbnailsList
              thumbnails={files}
              handleRemoveMediaClick={handleRemoveMediaClick}
            />
            <BrowseFilesButton onClick={handleBrowseFilesButtonClick}>
              Browse files
            </BrowseFilesButton>
            <input
              onChange={inputFileOnChange}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
            />
          </DropZone>
        </Container>
      </MainWrapper>
    </div>
  );
}

export default App;
