import axios from 'axios'

const key='AIzaSyCgWq9sN0eWnI1jJVtcgs-eGlusQC5g0Hk'
const url='https://www.googleapis.com/youtube/v3'



export const getPlaylistItems =async (playlistId,nextPageToken='',prevPageToken='',maxResults=10)=>{
const {data} = await axios.get(`${url}/playlistItems?part=snippet&playlistId=${playlistId}&pageToken=${nextPageToken||prevPageToken}&maxResults=${maxResults}&key=${key}`)
return data

}

export const getPlaylist = async (playlistId) =>{

    const {data} = await axios.get(`${url}/playlists?part=snippet,contentDetails&id=${playlistId}&key=${key}`)
    const {channelId,channelTitle,publisedAt,title,description,thumbnails} = data.items[0].snippet
    return {
        playlistId:data.items[0].id,
        channelId,
        channelTitle,
        publisedAt,
        title,
        description,
        thumbnails:thumbnails.default,
        itemCount:data.items[0].contentDetails.itemCount
    }
}
