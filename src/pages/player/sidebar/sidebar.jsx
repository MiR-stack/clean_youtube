import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMore } from "../../../store/playlistItems";
import ItemCard from "./card";

const Sidebar = () => {
  const playlist = useSelector((state) => state.player.playlist);

  console.log(playlist.items);

  const [playlistItems, setPlaylistItems] = useState();

  console.log(playlistItems);

  useEffect(() => {
    setPlaylistItems(playlist.items.slice(0, 5));
  }, [playlist]);

  const dispatch = useDispatch();
  const handleLoad = (item) => {
    let count = playlistItems.length;
    count += item;
    if (playlist.items.length <= count) {
      dispatch(loadMore(playlist.playlistId));
      handleLoad(item);
    }
    setPlaylistItems(playlist.items.slice(0, count));

    console.log(count);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#eeeeee",
        borderRadius: "10px",
        width:'40%'
      }}
    >
      <Box sx={{ height: "70vh", overflow: "auto" }}>
        {playlistItems?.map((item) => (
          <ItemCard
            key={item.id}
            title={item.snippet.title}
            channelTitle={item.snippet.channelTitle}
            thumbnail={item.snippet.thumbnails.standard}
            videoId={item.contentDetails.videoId}
          />
        ))}
      </Box>
      {playlist.nextPageToken && (
        <Button
          sx={{ m: 1 }}
          onClick={() => {
            handleLoad(5);
          }}
        >
          load more...
        </Button>
      )}
    </Box>
  );
};

export default Sidebar;
