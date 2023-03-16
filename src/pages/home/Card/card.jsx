import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Actions from "./actions";


const linkStyle = {
  textDecoration: "none",
  color: "black",
};


const InfoCard = ({
  title,
  description,
  thumbnails,
  playlistId,
  channelTitle,
}) => {
  

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component={"img"}
        alt={title}
        height="150px"
        image={thumbnails.url}
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography
          gutterBottom
          variant="h6"
          href="/"
          component="a"
          sx={linkStyle}
        >
          {`${title.substr(0, 50)}${title.length > 50 ? "..." : ""}`}
        </Typography>
        <Typography variant="body2">{channelTitle} </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
     <Actions playlistId={playlistId} />
    </Card>
  );
};

export default InfoCard;
