import {configureStore} from '@reduxjs/toolkit'
import playlistsInfo from './playlistsInfo'
import playlistItems from './playlistItems'

const store = configureStore({
    reducer:{
        playlistsInfo,
        playlistItems
    }
})

export default store