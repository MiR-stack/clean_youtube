import { useEffect, useState } from "react"
import { getImmutableData, getValidId } from "../utils"
import {getPlaylist,getPlaylistItems} from '../api/index'
import storage from '../storage/index'

const usePlaylist = () =>{

    const initState = {
        playlistInfo:{
         playlists:[],
         recentPlaylists:[],
         favouritePlaylists:[]
        },
        playlistItems:[]
     }

    const [state,setState] = useState({...initState})

    const [loading,setLoading] = useState(false)
    const [ error,setError] = useState(null)


    useEffect(()=>{

        const data = storage.getData()

        console.log(data);
        if(data){
            setState(data)
        }

    },[])

    useEffect(()=>{
        if(state.playlistInfo.playlists.length >0){
            storage.setData(state)
            console.log('reached');
        }
    },[state])
/**
 * find playlist from playlistInfo by id and playlistType
 * @param {String} playlistType 
 * @returns 
 */
    const findPlaylistInfoById = (playlistId,playlistType='playlists') => {
        return state.playlistInfo[playlistType].find(playlist => playlist.playlistId === playlistId)
    }

/**
 * find Playlist item from all playlistItems
 * @returns 
 */
    const findPlaylistItemById = (playlistId) =>{
        return state.playlistItems.find(playlist => playlist.playlistId = playlistId)
    }


/**
 * add playlist info in any category
 * @param {String} playlistType 
 */
    const addPlaylistInfo = async (playlistId,playlistType='playlists') =>{

        playlistId = getValidId(playlistId)

        if(!playlistId) return setError('inavalid id or url')

   try{
    setLoading(true)

    let newPlaylistInfo = findPlaylistInfoById(playlistId,'playlists')

    if(playlistType !== 'playlists'){
     let playlist = findPlaylistInfoById(playlistId,playlistType)
     if(!playlist){
         setState({...state,playlistInfo:{...state.playlistInfo,[playlistType]:[newPlaylistInfo,...state.playlistInfo[playlistType]]}})
     }
    }

    if(!newPlaylistInfo){
      newPlaylistInfo = await getPlaylist(playlistId)
      setState(prev =>{
         return {...prev, playlistInfo:{...prev.playlistInfo,playlists:[...prev.playlistInfo[playlistType],newPlaylistInfo]}  }
     })



 }
 setLoading(false)
   }catch(err){
    setLoading(false)
    setError(err.message)
   }

    }

// adding playlist item
    const addPlaylistItems = async (playlistId) =>{
       try{
        setLoading(true)
        let playlistItem= findPlaylistItemById(playlistId)

       if(!playlistItem){
        playlistItem = await getPlaylistItems(playlistId)
        playlistItem.playlistId = playlistId
        setState({...state,playlistItems:[...state.playlistItems,playlistItem]})
        setLoading(false)
       }
       }catch(err){
        setError(err.message)
        setLoading(false)
       }

    }


    const loadMoreItems =async (playlistId)=>{
        try{
            setLoading(true)
          const newState = getImmutableData(state)
            let oldItems = newState.playlistItems.find(item => item.playlistId === playlistId)
            const  playlistItem = await getPlaylistItems(playlistId,oldItems.nextPageToken)  
            oldItems = {
                ...oldItems,
                ...playlistItem,
                items:[...oldItems.items,...playlistItem.items]                
            }     
            console.log(newState)     
          setState(newState)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setError(err.message)
        }
    }

    
  const removePlaylist = (playlistId) =>{
    const newPlaylistItems = state.playlistItems.filter(playlist => playlist.items[0].snippet.playlistId !== playlistId)
   const playlistTypes = Object.keys(state.playlistInfo)

  const newPlaylistInfo = playlistTypes.reduce((acc,cur) =>{
   acc[cur] = state.playlistInfo[cur].filter(playlist => {
    console.log(playlist.playlistId, playlistId)
  return  playlist.playlistId !== playlistId
   })

   return acc
   },{})

    // const newPlaylistInfo = removePlaylistInfoById()

    setState({playlistInfo:newPlaylistInfo,playlistItems:newPlaylistItems})
  }  

  return {playlistInfo:state.playlistInfo,playlistItems:state.playlistItems,loading,error,findPlaylistItemById,addPlaylistInfo,addPlaylistItems,removePlaylist,loadMoreItems}
   
}

export default usePlaylist;
