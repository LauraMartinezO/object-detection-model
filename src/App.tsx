import './App.css'
import Button from '@mui/material/Button';
import play from '../src/assets/icons/play.png';
import upload from '../src/assets/icons/upload.png';
import { ChangeEvent } from 'react';

function App() {
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log("Archivo: ", file?.name);
  }

  async function openCamera(e){
    e.preventDefault();
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: true});
      console.log("Stream prendida: ", stream);
    } catch (error) {
      console.error("Error al acceder a la cámara: ", error);
    }
  }


  return (
    <div className="container">
      <div className="container__header">
        <h2 className="container__title">
          Object Detection Input
        </h2>
      </div>
      <div className="buttonContainer">
        <input  type='file' name='image' accept='image/png, image/jpeg' onChange={uploadFile}/>
        <Button variant="contained"
        sx={{
          backgroundColor: "#424B5A",
          "&:hover": { backgroundColor: "#424B5A" },
        }}
        endIcon={
          <img className="buttonContainer__icon" src={upload} alt="Upload icon" />
        }
        >
          Upload file
        </Button>
        <Button variant="outlined"
        onClick={openCamera}
        endIcon={
          <img className="buttonContainer__icon" src={play} alt="Play icon" />
        }
        >
          Open camera
        </Button>
      </div>
    </div>
  )
}

export default App
