import {
  EuiBadge,
  EuiButtonEmpty,
  EuiCard,
  EuiImage,
  EuiText,
} from "@elastic/eui";
import PropTypes from "prop-types";

function StreamCard({ data, onClick }) {
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

  return (
    <EuiCard
      display="transparent"
      textAlign="left"
      href={"/streams/views/" + data.cameraId}
      image={
        <EuiImage src="https://via.placeholder.com/1920x1080/eee?text=16:9"></EuiImage>
      }
      title={
        <div className="items-center inline-flex">
          <EuiText size="m" className="pr-2">
            <strong>{data.name}</strong>
          </EuiText>
          <EuiBadge color="#FBFBFB">HIKVision</EuiBadge>
        </div>
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
