import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";

function Content() {
  const {
    snippet: { description, title },
  } = useSelector((state) => state.player.currentItem);

  const [open,setOpen] = useState(false)

  return (
    <Stack gap={1}>
      <Typography variant="h6">{title} </Typography>
      <Typography variant="body2" >{open?description:`${description.substr(0,200)}...`} {open? <Button onClick={()=>{setOpen(false)}}>show less </Button>:<Button onClick={()=>{setOpen(true)}}>show more</Button>} </Typography>
      
    </Stack>
  );
}

export default Content;
