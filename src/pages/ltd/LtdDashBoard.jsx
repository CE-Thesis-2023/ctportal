import { Table } from "@mantine/core";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";

export const LtdDashBoard = () => {
  const [ltds, setLtds] = useState([]);

  useEffect(() => {
    fetch("http://103.165.142.44:7880/api/devices")
      .then((res) => res.json())
      .then((data) => setLtds(data.transcoders));
  }, []);

  console.log(ltds);

  const rows = ltds.map((element) => (
    <Table.Tr key="1">
      <Table.Td>{element.deviceId}</Table.Td>
      <Table.Td>Rasberry Pi 4</Table.Td>
      <Table.Td>SPE</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{new Date().getDate()}</Table.Td>
    </Table.Tr>
  ));

  const breadcrumbs = [
    {
      text: "Videos",
      href: "",
    },
    {
      text: "Transcoders",
      href: "/ltd",
    },
  ];

  return (
    <>
      <Header
        breadcrumps={breadcrumbs}
        title={"Transcoder"}
        description={"View and manage all transcoders"}
      />
      <Table stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>System</Table.Th>
            <Table.Th>Camera</Table.Th>
            <Table.Th>Time Stamp</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};
export default LtdDashBoard;
