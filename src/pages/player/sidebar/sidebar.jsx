import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMore } from "../../../store/playlistItems";
import ItemCard from "./card";

const Sidebar = () => {
  const playlist = useSelector((state) => state.player.playlist);

  const [playlistItems, setPlaylistItems] = useState(playlist.items.slice(0, 5));

  useEffect(() => {
    if (playlistItems.items?.length <= 5) {
      setPlaylistItems(playlist.items.slice(0, 5));
    }

  }, [playlist]);

  console.log('playlistITems', playlist)

  const dispatch = useDispatch();
  /**
   * load more items based on next page token
   * @param {Number} item
   */
  const handleLoad = (item) => {
    let count = playlistItems.length;
    count += item;
    if (playlist.items.length <= count) {
      dispatch(loadMore(playlist.playlistId));
      handleLoad(item);
    }
    setPlaylistItems(playlist.items.slice(0, count));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#eeeeee",
        borderRadius: "10px",
        width: "40%",
      }}
    >
      <Box sx={{ height: "70vh", overflow: "auto" }}>
        {playlistItems?.map((item) => (
          <ItemCard key={item.id} item={item} />
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
