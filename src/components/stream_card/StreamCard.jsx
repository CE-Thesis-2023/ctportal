import {
  EuiBadge,
  EuiButtonEmpty,
  EuiCard,
  EuiImage,
  EuiText,
} from "@elastic/eui";
import { ActionIcon, Flex } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";

function StreamCard({ data }) {
  function parseDateToSince() {
    return "Streaming for 3 days";
  }

  function getBadgeColor() {
    data.protocol = "SRT";
    switch (data.protocol) {
      case "SRT":
        return "primary";
      case "RTMP":
        return "success";
      default:
        return "secondary";
    }
  }

  const deleteHandler = (e) => {
    e.preventDefault();

    fetch(`http://103.165.142.44:7880/api/cameras?id=${e.currentTarget.id}`, {
      method: "DELETE",
    })
      .then(() => console.log("Deleted"))
      .catch((e) => console.log(e.message));
    window.location.reload();
  };

  return (
    <EuiCard
      display="transparent"
      textAlign="left"
      href={"/streams/views/" + data.cameraId}
      image={
        <EuiImage src="https://via.placeholder.com/1920x1080/eee?text=16:9"></EuiImage>
      }
      title={
        <Flex justify="space-between" align="center">
          <div className="items-center inline-flex">
            <EuiText size="m" className="pr-2">
              <strong>{data.name}</strong>
            </EuiText>
            <EuiBadge color="#FBFBFB">HIKVision</EuiBadge>
          </div>
          <ActionIcon bg={"white"} onClick={deleteHandler} id={data.cameraId}>
            <IconTrash color="red" />
          </ActionIcon>
        </Flex>
      }
      titleSize="xs"
      titleElement="p"
      description={
        <EuiText color="#808080" size="xs">
          <strong>{data.ip}</strong>
          {" • " + parseDateToSince()}
        </EuiText>
      }
      footer={
        <div className="flex flex-row items-center justify-between">
          <EuiBadge color={getBadgeColor()} isDisabled={false}>
            {data.protocol}
          </EuiBadge>
          <EuiButtonEmpty
            color={"primary"}
            size="s"
            // onClick={() => {
            //   onClick(data.id, data.streamUrl, data.cameraId);
            // }}
          >
            View stream
          </EuiButtonEmpty>
        </div>
      }
    />
  );
}

export default StreamCard;

StreamCard.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};
