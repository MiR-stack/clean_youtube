import { createSlice } from "@reduxjs/toolkit";
import storage, { CURRENT_PLAYLIST } from "../storage";

let initialState = {
  currentVideoId: "",
  playlistId: "",
  playlist: {},
  loading:false,
};

const currentPlaylist = storage.getData(CURRENT_PLAYLIST)

if(!currentPlaylist){
  storage.setData(CURRENT_PLAYLIST,initialState)
}else{
  initialState = storage.getData(CURRENT_PLAYLIST)
}



const player = createSlice({
  name: "player",
  initialState,
  reducers: {
    playVideo: (state, action) => {
      state.loading = true
      if (!action.payload) {
        state.currentVideoId =
          state.playlist.items[0].snippet.resourceId.videoId;
          state.loading = false
          return
      }

      state.currentVideoId = action.payload;
      state.loading = false
    },
    playlistId: (state, action) => {
      state.playlistId = action.payload;
    },
    addPlaylist:(state ,action)=>{
      state.playlist = action.payload
    }
  },
});

export const { playVideo, playlistId,addPlaylist } = player.actions;
export default player.reducer;
