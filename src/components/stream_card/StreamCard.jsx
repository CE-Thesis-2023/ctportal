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
      href={"/streams/views/" + data.id}
      image={<EuiImage src={data.thumbnailUrl}></EuiImage>}
      title={
        <div className="items-center inline-flex">
          <EuiText size="m" className="pr-2">
            <strong>{data.info.location}</strong>
          </EuiText>
          <EuiBadge color="#FBFBFB">{data.info.manufacturer}</EuiBadge>
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
            onClick={() => {
              onClick(data.id, data.streamUrl, data.cameraId);
            }}
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
