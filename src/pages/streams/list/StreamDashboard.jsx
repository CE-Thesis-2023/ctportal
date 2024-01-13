import { EuiFlexGrid, EuiFlexItem } from "@elastic/eui";
import { useTitle } from "ahooks";
import Header from "../../../components/header/Header";
import StreamCard from "../../../components/stream_card/StreamCard";
import Filter from "../../../components/filter_section/filter";
import { Pagination } from "@mantine/core";

import { useState } from "react";
function StreamDashboard() {
  const [activePage, setPage] = useState(1);
  useTitle("ALSS - Stream Dashboard", {
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

  const streamData = {
    id: "0001",
    streamUrl: "https://streams.alss.tech",
    info: {
      location: "Warehouse A",
      manufacturer: "HKVision",
    },
    cameraId: "0001",
    started: new Date().toISOString(),
    protocol: "RTMP",
    thumbnailUrl: "https://via.placeholder.com/1920x1080/eee?text=16:9",
    ip: "192.168.10.200",
  };

  return (
    <div>
      <Header
        breadcrumps={breadcrumbs}
        title="Streams"
        rightSideItems={[]}
        description={"Discover all the current video streams"}
      ></Header>
      <Filter />
      <EuiFlexGrid columns={4} responsive>
        <EuiFlexItem>
          <StreamCard data={streamData} />
        </EuiFlexItem>
      </EuiFlexGrid>
      <Pagination
        p={20}
        total={3}
        value={activePage}
        onChange={setPage}
        mt="sm"
      />
    </div>
  );
}

export default StreamDashboard;
