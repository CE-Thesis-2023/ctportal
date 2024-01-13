import {
  EuiSplitPanel,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLinks,
} from "@elastic/eui";
import { Button, Flex, Switch, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const CameraController = ({ streamingId }) => {
  const [streamState, setStreamState] = useState(false);

  console.log(streamingId);

  useEffect(() => {
    fetch(`http://103.165.142.44:7880/cameras/${streamingId}/streams`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const switchHanlder = () => {
    setStreamState(!streamState);

    fetch(
      `http://103.165.142.44:7880/api/cameras/${streamingId}/streams?enable=${!streamState}`,
      {
        method: "PUT",
      }
    );
  };
  const tiltingCamera = (e) => {
    const cameraLocator = e.target.value;

    let postCamera;

    switch (cameraLocator) {
      case "up":
        postCamera = {
          cameraId: streamingId,
          pan: 0,
          tilt: 50,
        };
        break;
      case "down":
        postCamera = {
          cameraId: streamingId,
          pan: 0,
          tilt: -50,
        };
        break;
      case "left":
        postCamera = {
          cameraId: streamingId,
          pan: -50,
          tilt: 0,
        };
        break;
      case "right":
        postCamera = {
          cameraId: streamingId,
          pan: 50,
          tilt: 0,
        };
        break;
      default:
        break;
    }

    fetch("http://103.165.142.44:7880/api/rc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postCamera),
    }).then(() => console.log("TILED"));
  };

  return (
    <>
      <EuiHeader style={{ padding: "15px" }}>
        <EuiHeaderSectionItem
          border="right"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Camera Controller
        </EuiHeaderSectionItem>

        {/* TODO: Make new tabs*/}
        <EuiHeaderLinks>
          <Switch
            onClick={switchHanlder}
            size="xl"
            onLabel="On"
            offLabel="Off"
          />
        </EuiHeaderLinks>
      </EuiHeader>
      <EuiSplitPanel.Inner grow className="">
        <Center h={"100%"}>
          <Flex justify="center" align="center">
            <Button p={"0 30px"} onClick={tiltingCamera} value={"left"}>
              Left
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100px",
                justifyContent: "space-between",
              }}
            >
              <Button p={"10px 30px"} onClick={tiltingCamera} value={"up"}>
                Up
              </Button>
              {/* <Button p={"20px 30px"} variant="outline"></Button> */}
              <Button p={"10px 30px"} onClick={tiltingCamera} value={"down"}>
                Down
              </Button>
            </div>
            <Button p={"0 30px"} onClick={tiltingCamera} value={"right"}>
              Right
            </Button>
          </Flex>
        </Center>
      </EuiSplitPanel.Inner>
    </>
  );
};

CameraController.propTypes = {
  streamingId: PropTypes.string.isRequired,
};

export default CameraController;
