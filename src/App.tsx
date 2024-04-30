import "./App.css";

import { Button, Grid } from "@mui/material";
import {
  FileUploadOutlined,
  PlayCircleOutlineRounded,
} from "@mui/icons-material";
import { ChangeEvent } from "react";

import CardComponent from "./components/CardComponent";

function App() {
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log("Archivo: ", file?.name);
  };

  async function openCamera(e) {
    e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Stream prendida: ", stream);
    } catch (error) {
      console.error("Error al acceder a la cámara: ", error);
    }
  }

  return (
    <div className="container">
      <CardComponent title="Object Detection Input">
        <Grid container justifyContent="center" marginTop={5} columnSpacing={6}>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#424B5A",
                "&:hover": { backgroundColor: "#424B5A" },
              }}
              component="label"
              endIcon={<FileUploadOutlined />}
            >
              Upload File
              <input
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                onChange={uploadFile}
                hidden
              />
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              onClick={openCamera}
              endIcon={<PlayCircleOutlineRounded />}
            >
              Open camera
            </Button>
          </Grid>
        </Grid>
      </CardComponent>
    </div>
  );
}

export default App;
