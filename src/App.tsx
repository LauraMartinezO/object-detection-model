import "./App.css";

import { Button, Grid, Box, CardMedia } from "@mui/material";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { FileUploadOutlined, PlayCircleOutlineRounded } from "@mui/icons-material";
import { drawRect } from "./utilities/drawBox";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as cocossd from "@tensorflow-models/coco-ssd";
import CardComponent from "./components/CardComponent";
import Webcam from "react-webcam";


function App() {
  const [uploadedFile, setUploadedFile] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      detectObjectsFromImage(imageUrl);
    }
    console.log("Archivo: ", file?.name);
  };

  const openCamera = () => {
    setShowWebcam(!showWebcam);
  }

  // Main function
  const runCoco = async () => {
    tf.setBackend("webgl")
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      webcamRef.current?.video?.readyState !== undefined &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      if (canvasRef.current !== null && canvasRef.current !== undefined) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        const obj = await net.detect(video);
        console.log(obj)

        // Draw mesh
        const ctx = canvasRef.current.getContext("2d");
        if (ctx != null && ctx != undefined){
          drawRect(obj, ctx);
        }
      } else {
        console.error("canvasRef is null or undefined");
      }
    }
  };

  const detectObjectsFromImage = async (imageUrl) => {
    tf.setBackend("webgl");
    const net = await cocossd.load();
    console.log("Handpose model loaded.");

    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      const obj = await net.detect(img);
      console.log(obj);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx !== null && ctx != undefined) {
        ctx.drawImage(img, 0, 0);
        drawRect(obj, ctx);
        setUploadedFile(canvas.toDataURL());
      }
    };
  };


  useEffect(() => {
    runCoco();
  });

  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      <Grid container columns={1} rowGap={5}>
        <Grid item xs={8}>
          <CardComponent height={"20vh"} title="Object Detection Input">
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
          <CardComponent height={"70vh"} title="Results">
            <div style={{ position: "relative" }}>
              {showWebcam ? (
                <div style={{ 
                  width: "100%", 
                  height: "430px", 
                  margin: "1.5rem", 
                  objectFit: "contain" 
                  }}
                >
                <Webcam
                  ref={webcamRef}
                  muted={true}
                  style={{ 
                    width: "100%", 
                    height: "100%" 
                  }}
                />
                <canvas
                  ref={canvasRef}
                  style={{ 
                    position: "absolute", 
                    top: 0, left: 25, 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain"
                  }}
                />
              </div>
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
            </div>
          </CardComponent>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
