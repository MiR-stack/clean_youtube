import { Box } from "@mui/system";
import React from "react";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";

function VideoPlayer() {
  const {currentItem} = useSelector((state) => state.player);

  const videoId = currentItem.contentDetails.videoId

  return (
    <Box
      sx={{
        height: {xs:'300px',  sm: "400px", md: "300px", lg: "400px" },
      }}
    >
      {videoId && <ReactPlayer
          width={"100%"}
          height={"100%"}
          url={`https://www.youtube.com/watch?v=${videoId}
          `}
          controls={true}
          playing={true}
        />}
    </Box>

  );
}

export default VideoPlayer;
