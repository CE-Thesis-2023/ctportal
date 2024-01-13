import {
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHealth,
  EuiImage,
  EuiSkeletonText,
  EuiSpacer,
  EuiSplitPanel,
  EuiTab,
  EuiTabs,
  EuiText,
} from "@elastic/eui";
import { useTitle } from "ahooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <>
      <Header
        breadcrumps={breadcrumbs}
        title="Living Room"
        rightSideItems={[]}
      ></Header>
      <EuiSpacer size="m" />
      <section>
        <EuiFlexGroup direction="row">
          <EuiFlexItem grow={6}>
            {/* <EuiImage
              src="https://via.placeholder.com/1920x1080/eee?text=16:9"
              alt=""
            /> */}
            <iframe
              src={`http://103.165.142.44:8889/${window.location.pathname
                .split("/")
                .pop()}`}
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
