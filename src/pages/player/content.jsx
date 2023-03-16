import { Box } from "@mui/system"
import { useSelector } from "react-redux"

function Content() {

    const description = useSelector(state => state.player.playlist.items)
    
  return (
    <Box>
        
    </Box>
  )
}

export default Content