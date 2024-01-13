import { Flex, Autocomplete, Select } from "@mantine/core";
import { EuiFilterGroup, EuiFilterButton } from "@elastic/eui";
export const Filter = () => {
  return (
    <Flex
      style={{
        paddingTop: "20px",
        paddingBottom: "30px",
      }}
      mih={50}
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Autocomplete
        w={400}
        size="md"
        placeholder="Search"
        data={["Stream 1", "Stream 2", "Stream 3"]}
      />
      <EuiFilterGroup style={{ fontFamily: "Roboto" }}>
        <EuiFilterButton style={{ padding: "0 30px" }}>A-Z</EuiFilterButton>
        <EuiFilterButton style={{ padding: "0 30px" }}>
          Earliest
        </EuiFilterButton>
        <EuiFilterButton style={{ padding: "0 30px" }}>Latest</EuiFilterButton>
      </EuiFilterGroup>

      <Select
        placeholder="Manafracture"
        size="md"
        data={["HIKVision", "Adobe", "Canon", "Axxon"]}
      />

      <Select
        placeholder="System"
        size="md"
        data={["HIKVision", "Adobe", "Canon", "Axxon"]}
      />
    </Flex>
  );
};

export default Filter;
