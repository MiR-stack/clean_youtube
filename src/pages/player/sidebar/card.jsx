import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { playVideo } from "../../../store/player";

const ItemCard = ({ title, channelTitle, thumbnail, videoId }) => {
  const dispatch = useDispatch();
  const currentVideoId = useSelector((state) => state.player.currentVideoId);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        bgcolor: videoId === currentVideoId ? "#bdbdbd" : "",
        cursor: "pointer",
        m:1
      }}

      id={videoId}
      
      onClick={() => {
        dispatch(playVideo(videoId));
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: "80px", width: "100px" }}
        image={thumbnail.url}
        alt={title}
      />
      <CardContent>
        <Typography variant="subtitle2" component="h3">
          {`${title.length > 40 ? title.substr(0,40) + "..." : title}`}{" "}
        </Typography>
        <Typography variant="caption">{channelTitle} </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
