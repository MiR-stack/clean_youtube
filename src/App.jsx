import GapRemover from "./components/gapRemover";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import storage, { PLAYLIST_INFO, PLAYLIST_ITEMS } from "./storage";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Player from "./pages/player";


const App = () => {
  // save any changes into local storage
  const playlistInfo = useSelector((state) => state.playlistsInfo);
  useEffect(() => {
    storage.setData(PLAYLIST_INFO, playlistInfo);
  }, [playlistInfo]);

  const playlistItems = useSelector((state) => state.playlistItems);
  useEffect(() => {
    storage.setData(PLAYLIST_ITEMS, playlistItems);
  }, [playlistItems]);

  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <GapRemover />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" Component={Player} />
      </Routes>
    </Router>
  );
};

export default App;
