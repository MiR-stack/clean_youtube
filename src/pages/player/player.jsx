import { useSelect } from "@mui/base"
import { Box } from "@mui/system"
import React from "react"
import ReactPlayer from "react-player/youtube"

function VideoPlayer() {

  const videoId = useSelect(state => state.player)

  console.log(videoId)

  return (
    <Box sx={{width:{xs:'100%',md:'80%',lg:'60%'},height:{sx:'200px',md:'300px', lg:'400px'}}}>
        <ReactPlayer width={'100%'} height={'100%'} url={`https://www.youtube.com/watch?v=${videoId}`} controls={true} />
    </Box>
  )
}

export default VideoPlayer