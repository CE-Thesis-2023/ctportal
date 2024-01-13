import { EuiTab } from "@elastic/eui";
import { useTitle } from "ahooks";
import { useState } from "react";
import Header from "../../components/header/Header";
import EventTable from "../../components/table/table";

function EventDashboard() {
  useTitle("ALSS - Events", {
    restoreOnUnmount: true,
  });

  const breadcrumbs = [
    {
      text: "Detection",
      href: "",
    },
    {
      text: "Events",
      href: "/detection/events",
    },
  ];

  const [selectTabId, setSelectedTabId] = useState(1);

  const tabs = [
    renderTab(1, () => {}, "People"),
    renderTab(2, () => {}, "Objects"),
  ];

  function renderTab(id, onClick, title, data = {}) {
    return (
      <EuiTab
        key={id}
        onClick={() => {
          setSelectedTabId(id);
          onClick();
        }}
        isSelected={selectTabId === id}
        {...data}
      >
        {title}
      </EuiTab>
    );
  }

  return (
    <div>
      <Header
        breadcrumps={breadcrumbs}
        title={"Events"}
        description={"View and manage all events collected from camera streams"}
        tabs={tabs}
      />
      <EventTable />
    </div>
  );
}

export default EventDashboard;
