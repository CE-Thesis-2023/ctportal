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

  useEffect(() => {
    fetch(`http://103.165.142.44:7880/api/cameras/${streamingId}/streams`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.started);
        setStreamState(data.started);
      });
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

  const tiltedUp = () => {
    fetch("http://103.165.142.44:7880/api/rc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cameraId: streamingId,
        pan: 0,
        tilt: 50,
      }),
    }).then(() => console.log("TILED"));
  };
  const tiltedRight = () => {
    fetch("http://103.165.142.44:7880/api/rc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cameraId: streamingId,
        pan: 50,
        tilt: 0,
      }),
    }).then(() => console.log("TILED"));
  };
  const tiltedLeft = () => {
    fetch("http://103.165.142.44:7880/api/rc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cameraId: streamingId,
        pan: -50,
        tilt: 0,
      }),
    }).then(() => console.log("TILED"));
  };
  const tiltedDown = () => {
    fetch("http://103.165.142.44:7880/api/rc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cameraId: streamingId,
        pan: 0,
        tilt: -50,
      }),
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
            checked={streamState}
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
            <Button p={"0 30px"} onClick={tiltedLeft} value={"left"}>
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
              <Button p={"10px 30px"} onClick={tiltedUp} value={"up"}>
                Up
              </Button>
              {/* <Button p={"20px 30px"} variant="outline"></Button> */}
              <Button p={"10px 30px"} onClick={tiltedDown} value={"down"}>
                Down
              </Button>
            </div>
            <Button p={"0 30px"} onClick={tiltedRight} value={"right"}>
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
