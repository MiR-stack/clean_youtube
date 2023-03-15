import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylistItems } from "../api";
import { PLAYLIST_ITEMS } from "../storage";
import storage from "../storage";

const addPlaylistItems = createAsyncThunk(
  "playlistItems",
  async (playlistId, { getState }) => {
    const state = getState();

    if (isExist(state.playlistItems.items, playlistId))
      throw Error("playlist items already exist");

    return getPlaylistItems(playlistId);
  }
);

const loadMore = createAsyncThunk(
  "playlistItems/loadMore",
  async (playlistId, { getState }) => {
    const state = getState();
    const playlistItems = isExist(state.playlistItems.items, playlistId);

    if (!playlistItems) throw Error("playlist doesn't exist");

    return getPlaylistItems(playlistId, playlistItems.nextPageToken);
  }
);

// define initial data
let initialState = {
  items: [],
  loading: false,
  error: "",
};
const localState = storage.getData(PLAYLIST_ITEMS);

if (!localState) {
  storage.setData(PLAYLIST_ITEMS, initialState);
} else {
  initialState = storage.getData(PLAYLIST_ITEMS);
}

// create playlist items slice
const playlistItems = createSlice({
  name: "playlistItems",
  initialState,
  reducers: {
    removePlaylistItems: (state, action) => {
      if (!isExist(state.items, action.payload)) {
        state.error = "playlist items doesn't exist";
        return;
      }
      state.items = state.items.filter(
        (playlist) => playlist.playlistId !== action.payload
      );
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlaylistItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPlaylistItems.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addPlaylistItems.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });

    // for load more items

    // handle pending
    builder.addCase(loadMore.pending, (state) => {
      state.loading = true;
    });

    // handle successfull requiest
    builder.addCase(loadMore.fulfilled, (state, action) => {
      // unmutable state
      const oldState = JSON.parse(JSON.stringify(state.items));

      // find playlist we need to load  more items
      let playlistItems = oldState.find(
        (playlist) => playlist.playlistId === action.payload.playlistId
      );
      

      playlistItems.nextPageToken = action.payload.nextPageToken;
      playlistItems.prevPageToken = action.payload.prevPageToken

      // update playlist items data with new items.
      playlistItems.items = [...playlistItems.items, ...action.payload.items];

      // remove this playlist data from all playlists, for avoid duplication
      const oldPlaylistItems = oldState.filter(
        (item) => item.playlistId !== action.payload.playlistId
      );

      // update state
      state.items = [...oldPlaylistItems, playlistItems];
      state.loading = false
      state.error = "";
    });

    // handle error
    builder.addCase(loadMore.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export { addPlaylistItems, loadMore };
export const { removePlaylistItems } = playlistItems.actions;
export default playlistItems.reducer;

// utils function

const isExist = (arr, playlistId) => {
  return arr.find((playlist) => playlist.playlistId === playlistId);
};
