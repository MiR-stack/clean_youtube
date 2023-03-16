import { Container } from "@mui/material"
import VideoPlayer from "./player"
import Sidebar from "./sidebar/sidebar"


const Player = () =>{
    return(
        <Container>
          <VideoPlayer/>
          <Sidebar />
        </Container>
    )
}

export default Player