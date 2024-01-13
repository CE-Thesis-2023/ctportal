import { Table } from "@mantine/core";

const elements = [
  {
    id: 6,
    type: "Face Recognition",
    system: "WareHouse A",
    camera: "Camera A (Backyard)",
    stamp: new Date().getDate(),
  },
  {
    id: 7,
    type: "Face Recognition",
    system: "WareHouse A",
    camera: "Camera A (Backyard)",
    stamp: new Date().getDate(),
  },
  {
    id: 8,
    type: "Face Recognition",
    system: "WareHouse A",
    camera: "Camera A (Backyard)",
    stamp: new Date().getDate(),
  },
  {
    id: 9,
    type: "Face Recognition",
    system: "WareHouse A",
    camera: "Camera A (Backyard)",
    stamp: new Date().getDate(),
  },
  {
    id: 10,
    type: "Face Recognition",
    system: "WareHouse A",
    camera: "Camera A (Backyard)",
    stamp: new Date().getDate(),
  },
];

export const EventTable = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.system}</Table.Td>
      <Table.Td>{element.camera}</Table.Td>
      <Table.Td>{element.stamp}</Table.Td>
    </Table.Tr>
  ));

  return (
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
  );
};
export default EventTable;
