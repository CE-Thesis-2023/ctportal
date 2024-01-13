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

import Header from "../../../components/header/Header";
import CameraController from "../../../components/camera_controller/camera_controller";

function StreamViewer() {
  useTitle("ALSS - Stream", {
    restoreOnUnmount: true,
  });
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

  const [selectedTabId, setSelectedTabId] = useState(0);

  const tabs = [
    {
      name: "Description",
      content: (
        <section>
          <EuiDescriptionList>
            <EuiDescriptionListTitle>Description</EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              HIKVision Streaming Video
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
                  HIKVision
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

  return (
    <>
      <Header
        breadcrumps={breadcrumbs}
        title="Live Footage"
        rightSideItems={[]}
      ></Header>
      <EuiSpacer size="m" />
      <section>
        <EuiFlexGroup direction="row">
          <EuiFlexItem grow={6}>
            <iframe
              src={`http://103.165.142.44:8889/${streamingId}`}
              width={"100%"}
              height={500}
              allowFullScreen
            />
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
              <CameraController streamingId={streamingId} />

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
