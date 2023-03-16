import {configureStore} from '@reduxjs/toolkit'
import playlistsInfo from './playlistsInfo'
import playlistItems from './playlistItems'
import player from './player'

const store = configureStore({
    reducer:{
        playlistsInfo,
        playlistItems,
        player
    }
})

export default store