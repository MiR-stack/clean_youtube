import GapRemover from "./components/gapRemover";
import Navbar from "./components/navbar/navbar";
import usePlaylist from "./hooks/usePlaylist";
import Home from "./pages/home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import storage, { PLAYLIST_INFO, PLAYLIST_ITEMS } from "./storage";
import { Button } from "@mui/material";
import {
  addFavorite,
  addRecent,
  removeFavourite,
  removePlaylistInfo,
} from "./store/playlistsInfo";
import { addPlaylistItems, loadMore, removePlaylistItems } from "./store/playlistItems";

const url =
  "https://www.youtube.com/playlist?list=PL9bw4S5ePsEGjT1n5VhWDBUHe5sDYos9L";
const id = "PL9bw4S5ePsEGjT1n5VhWDBUHe5sDYos9L";
const id2 = "PLgH5QX0i9K3p06YY1fyReA2UK8mh_zsiY";

const App = () => {
  const dispatch = useDispatch();

  const playlistInfo = useSelector((state) => state.playlistsInfo);
  // const {loading, playlistInfo,playlistItems,addPlaylistInfo,addPlaylistItems,removePlaylist,loadMoreItems} = usePlaylist()

  useEffect(() => {
    storage.setData(PLAYLIST_INFO, playlistInfo);
  }, [playlistInfo]);

  const playlistItems = useSelector((state) => state.playlistItems);
  useEffect(() => {
    storage.setData(PLAYLIST_ITEMS, playlistItems);
  }, [playlistItems]);

  const state = useSelector((state) => state);
  console.log("from app", state);

  return (
    <div>
      <Navbar />
      <GapRemover />
      <Button onClick={() => dispatch(addPlaylistItems(id))}>
        add playlist
      </Button>
      <Button onClick={() => dispatch(removePlaylistItems(id))}>
        remove playlist
      </Button>
      <Button onClick={() => dispatch(loadMore(id))}>
       load more
      </Button>

      <Home />
    </div>
  );
};

export default App;
