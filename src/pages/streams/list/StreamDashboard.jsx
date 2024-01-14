import { EuiFlexGrid, EuiFlexItem } from "@elastic/eui";
import { useTitle } from "ahooks";
import Header from "../../../components/header/Header";
import StreamCard from "../../../components/stream_card/StreamCard";
import Filter from "../../../components/filter_section/filter";
import {
  Modal,
  Button,
  Flex,
  Pagination,
  TextInput,
  Select,
  NumberInput,
} from "@mantine/core";

import "./StreamDashboard.css";

import { useForm } from "@mantine/form";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
function StreamDashboard() {
  const [opened, { open, close }] = useDisclosure(false);

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

  const [cameraData, setCameraData] = useState([]);

  useEffect(() => {
    fetch("http://103.165.142.44:7880/api/cameras")
      .then((res) => res.json())
      .then((data) => {
        setCameraData(data["cameras"]);
      })
      .catch(() => console.log("ERROR"));
  }, []);

  const [ltds, setLtds] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  useEffect(() => {
    fetch("http://103.165.142.44:7880/api/devices")
      .then((res) => res.json())
      .then((data) => setLtds(data.transcoders.map((obj) => obj.deviceId)));
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
      ip: "",
      port: "",
      username: "",
      password: "",
      transcoderId: "",
    },
  });

  const createNewStream = () => {
    fetch("http://103.165.142.44:7880/api/cameras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.getInputProps("name").value,
        ip: form.getInputProps("ip").value,
        port: form.getInputProps("port").value,
        username: form.getInputProps("username").value,
        password: form.getInputProps("password").value,
        transcoderId: selectValue,
      }),
    }).then(() => alert("You Have Created A New Stream"));
  };

  return (
    <div>
      <Flex align={"center"} justify={"space-between"}>
        <Header
          breadcrumps={breadcrumbs}
          title="Streams"
          rightSideItems={[]}
          description={"Discover all the current video streams"}
        ></Header>
        <Button
          onClick={open}
          leftSection={<IconPlus size={14} />}
          variant="filled"
        >
          Add Stream/Camera
        </Button>
      </Flex>
      <Filter />
      <Modal
        opened={opened}
        padding={"xl"}
        onClose={close}
        title="Add New Stream/Camera"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex justify="space-between">
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="IP Address"
            placeholder="IP Address"
            {...form.getInputProps("ip")}
          />
        </Flex>
        <NumberInput
          label="Port"
          placeholder="Port"
          {...form.getInputProps("port")}
        />
        <TextInput
          label="User Name"
          placeholder="User Name"
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Select
          label="Transcoder Id"
          placeholder="Transcoder Id"
          data={ltds}
          value={selectValue}
          onChange={setSelectValue}
        />

        {/* <TextInput
          label="Transcoder Id"
          placeholder="Transcoder Id"
          {...form.getInputProps("transcoderId")}
        /> */}
        <Flex justify="flex-end">
          <Button p={"0 40px"} mt={16} onClick={createNewStream}>
            Add
          </Button>
        </Flex>
      </Modal>
      <EuiFlexGrid columns={4} responsive>
        {cameraData.length > 0 &&
          cameraData.map((data) => (
            <EuiFlexItem key={data.id}>
              <StreamCard data={data} key={data.id} />
            </EuiFlexItem>
          ))}
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
