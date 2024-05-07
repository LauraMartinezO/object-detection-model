import "./App.css";

import { Button, Grid, Box, CardMedia } from "@mui/material";
import { useState, useRef } from "react";
import {
  FileUploadOutlined,
  PlayCircleOutlineRounded,
} from "@mui/icons-material";

import CardComponent from "./components/CardComponent";
import Webcam from "react-webcam";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
    }
    console.log("Archivo: ", file?.name);
  };

  const openCamera = () => {
    setShowWebcam(!showWebcam);
  }

  return (
    <Box sx={{ flexGrow: 1, margin: 4.2 }}>
      <Grid container columns={1} rowGap={5}>
        <Grid item xs={8}>
          <CardComponent height={155} title="Object Detection Input">
            <Grid
              container
              justifyContent="center"
              marginTop={5}
              columnSpacing={6}
            >
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
                  {showWebcam ? "Close camera" : "Open camera"}
                </Button>
              </Grid>
            </Grid>
          </CardComponent>
        </Grid>

        <Grid item xs={4}>
          <CardComponent height={530} title="Results">
            {showWebcam ? (
              <Webcam
                ref={webcamRef}
                style={{
                  width: "100%",
                  height: "430px",
                  margin: "1.5rem",
                  objectFit: "contain",
                }}
              />
            ) : (
              uploadedFile && (
                <CardMedia
                  component="img"
                  src={uploadedFile}
                  style={{
                    width: "100%",
                    height: "430px",
                    margin: "1.5rem",
                    objectFit: "contain",
                  }}
                />
              )
            )}
          </CardComponent>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
