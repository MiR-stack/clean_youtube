import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideoId: "",
  playlistId: "",
  playlist: {},
};

const player = createSlice({
  name: "player",
  initialState,
  reducers: {
    playVideo: (state, action) => {
      if (!state.currentVideoId) {
        state.currentVideoId =
          state.playlist.items[0].snippet.resourceId.videoId;
      }

      state.currentVideoId = action.payload;
    },
    playlistId: (state, action) => {
      state.playlistId = action.payload;
    },
  },
});

export const { playVideo, playlistId } = player.actions;
export default player.reducer;
