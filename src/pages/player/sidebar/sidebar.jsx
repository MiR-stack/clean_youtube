import { Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMore } from "../../../store/playlistItems";
import ItemCard from "./card";

const Sidebar = () => {
  const playlist = useSelector((state) => state.player.playlist);

  const [playlistItems, setPlaylistItems] = useState(
    playlist.items.slice(0, 5)
  );

  useEffect(() => {
    if (playlistItems.length < 6) {
      setPlaylistItems(playlist.items.slice(0, 5));
    }
  }, [playlist]);

  const dispatch = useDispatch();

  /**
   * load more items based on next page token
   * @param {Number} item
   */
  const handleLoad = (item) => {
    let count = playlistItems.length;
    count += item;
    console.log(playlist.items.length, count);
    if (playlist.items.length <= count && playlist.nextPageToken) {
      console.log("called");
      dispatch(loadMore(playlist.playlistId));
      setPlaylistItems(playlist.items.slice(0, count));
      return;
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
        width: {sm:'100%',md:'40%'},
      }}
    >
      <Box sx={{ height: "70vh",width:'100%',  overflow: "auto" }}>
        {playlistItems?.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Box>
      {playlistItems.length < playlist.items.length && (
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
