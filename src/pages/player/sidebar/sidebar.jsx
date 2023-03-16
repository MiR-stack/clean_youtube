import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isExist } from "../../../utils";

const Sidebar = () => {

    const playlistId = useSelector(state => state.player.playlistId)

    const playlists = useSelector(state=> state.playlistItems.items)

    const playlist = playlists.find(playlist=> playlist.playlistId === playlistId)
    
    console.log(playlist)

  return <Stack></Stack>;
};

export default Sidebar