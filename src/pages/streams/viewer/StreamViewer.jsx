import {
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHealth,
  EuiSpacer,
  EuiSplitPanel,
  EuiTab,
  EuiTabs,
  EuiText,
} from "@elastic/eui";
import { useTitle } from "ahooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Switch } from "@mantine/core";

import Header from "../../../components/header/Header";

function StreamViewer() {
  useTitle("ALSS - Stream", {
    restoreOnUnmount: true,
  });
  const params = useParams();

  console.log(params);

  const breadcrumbs = [
    {
      text: "Videos",
      href: "",
    },
    {
      text: "Streams",
      href: "/streams",
    },
  ];

  const [streamState, setStreamState] = useState(false);

  const [selectedTabId, setSelectedTabId] = useState(0);

  const tabs = [
    {
      name: "Description",
      content: (
        <section>
          <EuiDescriptionList>
            <EuiDescriptionListTitle>Description</EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              Video stream of the living room
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
          <EuiSpacer size="m" />
          <EuiFlexGroup direction="row">
            <EuiFlexItem grow>
              <EuiDescriptionList>
                <EuiDescriptionListTitle>Protocol</EuiDescriptionListTitle>
                <EuiDescriptionListDescription>
                  SRT
                </EuiDescriptionListDescription>
                <EuiDescriptionListTitle>Manufacturer</EuiDescriptionListTitle>
                <EuiDescriptionListDescription>
                  HKVision
                </EuiDescriptionListDescription>
              </EuiDescriptionList>
            </EuiFlexItem>
            <EuiFlexItem grow>
              <EuiDescriptionList>
                <EuiDescriptionListTitle>Duration</EuiDescriptionListTitle>
                <EuiDescriptionListDescription>
                  Started streaming 3 days ago
                </EuiDescriptionListDescription>
                <EuiDescriptionListTitle>Resolution</EuiDescriptionListTitle>
                <EuiDescriptionListDescription>
                  1920x1080@30fps
                </EuiDescriptionListDescription>
              </EuiDescriptionList>
            </EuiFlexItem>
          </EuiFlexGroup>
        </section>
      ),
    },
    {
      name: "Statistics",
      content: <div></div>,
    },
  ];

  function renderTabs() {
    return tabs.map((tab, index) => {
      return (
        <EuiTab
          key={index}
          isSelected={index == selectedTabId}
          onClick={() => {
            setSelectedTabId(index);
          }}
        >
          {tab.name}
        </EuiTab>
      );
    });
  }
  const streamingId = window.location.pathname.split("/").pop();

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
      <Flex justify="space-between" align="flex-end">
        <Header
          breadcrumps={breadcrumbs}
          title="Living Room"
          rightSideItems={[]}
        ></Header>
        <div>
          <Switch
            onClick={switchHanlder}
            size="xl"
            onLabel="OFF"
            offLabel="Enable"
          />
        </div>
      </Flex>
      <EuiSpacer size="m" />
      <section>
        <EuiFlexGroup direction="row">
          <EuiFlexItem grow={6}>
            {/* <EuiImage
              src="https://via.placeholder.com/1920x1080/eee?text=16:9"
              alt=""
            /> */}
            <iframe
              src={`http://103.165.142.44:8889/${streamingId}`}
              width={"100%"}
              height={500}
            ></iframe>
            <EuiSpacer size="l" />
            <EuiTabs>{renderTabs()}</EuiTabs>
            <EuiSpacer size="l" />
            {tabs[selectedTabId].content}
          </EuiFlexItem>
          <EuiFlexItem grow={4}>
            <EuiSplitPanel.Outer
              grow={false}
              hasShadow={false}
              hasBorder
              borderRadius="s"
              style={{ height: "40rem" }}
            >
              <EuiSplitPanel.Inner grow className="">
                <Flex>
                  <Button onClick={tiltedUp}>Up</Button>
                  <Button onClick={tiltedDown}>Down</Button>
                  <Button onClick={tiltedLeft}>Left</Button>
                  <Button onClick={tiltedRight}>Right</Button>
                </Flex>
                {/* <EuiSkeletonText lines={3} size="m" isLoading /> */}
              </EuiSplitPanel.Inner>
              <EuiSplitPanel.Inner grow={false} color="subdued">
                <div className="flex items-center justify-between">
                  <EuiHealth color="success">Connected</EuiHealth>
                  <EuiText size="s" color="#808080">
                    via <strong>WebSocket</strong>
                  </EuiText>
                </div>
              </EuiSplitPanel.Inner>
            </EuiSplitPanel.Outer>
          </EuiFlexItem>
        </EuiFlexGroup>
      </section>
    </>
  );
}

export default StreamViewer;
