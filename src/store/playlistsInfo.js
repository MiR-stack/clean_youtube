import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaylistInfo } from "../api";
import { getValidId } from "../utils";
import storage, { PLAYLIST_INFO } from '../storage/index'


const addPlaylistInfo = createAsyncThunk('playlistInfo',async (playlistId,{getState})=>{
  // check id or url validation
  playlistId = getValidId(playlistId)
  if(!playlistId) throw Error(' invalid id or url')

  const state = getState()

  // check is playlistInfo already exist
  const isExist = state.playlistsInfo.info.find(playlist => playlist.playlistId === playlistId)
  if(isExist) throw Error('playlist already exist')

  return getPlaylistInfo(playlistId)
})

// create initial data model
let initialState = {
  info:[],
  favorite:[],
  recent:[],
  loading:false,
  error:''
}

const localState = storage.getData(PLAYLIST_INFO)

if(!localState){
  storage.setData(PLAYLIST_INFO, initialState)
}else{
 initialState = storage.getData(PLAYLIST_INFO)
}


// create playlist information slice
const playlistInfo = createSlice({
  name:'playlistInfo',
  initialState,

  reducers:{
    removePlaylistInfo:(state,action) =>{
      state.info = state.info.filter(playlist => playlist.playlistId !== action.payload)
      state.error = ''
    },

    addFavorite:(state,action)=>{

      if(state.favorite.length >=5) {
        state.error = ' maximam capacity five playlists reached.' 
        return
      }

      if(isExist(state.favorite,action.payload)) {
        state.error = 'already exist'
        return
      }

      state.favorite.unshift(action.payload)
      state.error =''
    },
    removeFavourite:(state,action) =>{
      if(!isExist(state.favorite,action.payload)) {
        state.error = 'playlist doesn\'t exist'
        return
      }
      state.favorite = removeElement(state.favorite,action.payload)
      state.error = ''
    },

    addRecent:(state,action) =>{
      if(state.recent.length >=5)  {
        state.error = ' maximam capacity five playlists reached.'
        return
      }

      if(isExist(state.recent,action.payload)) {
        state.error = 'already exist'
        return
      }

      state.recent.unshift(action.payload)
      state.error = ''
    } 
  },

  extraReducers: (builder) =>{
    builder.addCase(addPlaylistInfo.pending,(state)=>{
      state.loading = true
    })
    builder.addCase(addPlaylistInfo.fulfilled,(state,action) =>{
      state.loading = false
      state.error = ''
      state.info.unshift(action.payload)
    })
    builder.addCase(addPlaylistInfo.rejected,(state,action) =>{
      state.loading = false
      state.error = action.error.message
    })
  }
})

export {addPlaylistInfo};
export const {removePlaylistInfo,addFavorite,removeFavourite,addRecent} = playlistInfo.actions
export default playlistInfo.reducer

// utils

const isExist = (arr,playlistId) => arr.find(id => id === playlistId)

const removeElement = (arr,playlistId) => arr.filter(id => id !== playlistId)