import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { playVideo } from "../../../store/player";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const {
    contentDetails: { videoId: id },
  } = useSelector((state) => state.player.currentItem);

  const { title, channelTitle, thumbnails } = item.snippet;
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        bgcolor: item.contentDetails.videoId === id ? "#bdbdbd" : "",
        cursor: "pointer",
        m: 1,
      }}
      onClick={() => {
        dispatch(playVideo(item));
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: "80px", width: "100px" }}
        image={thumbnails.standard.url}
        alt={title}
      />
      <CardContent>
        <Typography variant="subtitle2" component="h3">
          {`${title.length > 40 ? title.substr(0, 40) + "..." : title}`}{" "}
        </Typography>
        <Typography variant="caption">{channelTitle} </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
