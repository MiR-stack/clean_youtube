export const PLAYLIST_INFO = 'playlistInfo'
export const PLAYLIST_ITEMS = 'playlistItems'
export const CURRENT_PLAYLIST = 'currentPlaylist'

class Storage{
    setData(key,value){
        const json = JSON.stringify(value)
        localStorage.setItem(key,json)
    }
    getData(key){
       return JSON.parse(localStorage.getItem(key))
    } 
}

const storage = new Storage

export default storage