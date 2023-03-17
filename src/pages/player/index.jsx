import { Container } from "@mui/material";
import VideoPlayer from "./player";
import Sidebar from "./sidebar/sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylist, playVideo } from "../../store/player";
import storage, { CURRENT_PLAYLIST } from "../../storage";
import { Stack } from "@mui/system";

const Player = () => {
  const currentPlaylist = useSelector((state) => state.player);
  const { playlistId,currentItem } = currentPlaylist;
  const playlists = useSelector((state) => state.playlistItems.items);
  const playlist = playlists.find(
    (playlist) => playlist.playlistId === playlistId
  );
  
  

  const dispatch = useDispatch();
  useEffect(() => {
    if (playlist) {
      dispatch(addPlaylist(playlist));
      dispatch(playVideo());
    }

  }, [playlist]);
  // save any changes into local storage
  useEffect(() => {
    storage.setData(CURRENT_PLAYLIST, currentPlaylist);
  }, [currentPlaylist]);

  return (
    <Container sx={{ mt: 5 }}>
      {!(playlists.length >0 && playlist &&currentItem.id)?<div>loading...</div>  : (
        <Stack gap={3} direction="row">
          <VideoPlayer />
          <Sidebar />
        </Stack>
      )}
    </Container>
  );
};

export default Player;
