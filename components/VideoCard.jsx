import React from "react";
import { useVideojs } from "react-videojs-hook";
import { Box, Heading, Text } from "@chakra-ui/react";
import { format } from "timeago.js";

import "video.js/dist/video-js.css";

const VideoCard = ({ src, title, publishedDate }) => {
  const { vjsId, vjsRef, vjsClassName } = useVideojs({
    src,
    controls: true,
    autoplay: false,
    bigPlayButtonCentered: true,
    fluid: true,
    responsive: true,
  });

  return (
    <Box>
      <div style={{ borderRadius: "10px" }} data-vjs-player>
        <video
          style={{
            borderRadius: "10px",
            boxShadow: "-11px 4px 59px -38px rgba(0,0,0,0.75)",
          }}
          ref={vjsRef}
          id={vjsId}
          className={vjsClassName}
        ></video>
      </div>
      <Text color="gray.700" mt="0.5em" fontSize="3xl">
        {title}
      </Text>
      <Text color="gray.500">{format(publishedDate)}</Text>
    </Box>
  );
};

export default VideoCard;
