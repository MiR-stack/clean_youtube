import { useEffect, useState } from "react"
import { getImmutableData, getValidId } from "../utils"
import {getPlaylistInfo,getPlaylistItems} from '../api/index'
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
            storage.setData(state)        }
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
        return state.playlistItems.find(playlist => playlist.playlistId === playlistId)
    }


/**
 * add playlist info in any category
 * @param {String} playlistType 
 */
    const addPlaylistInfo = async (playlistId,playlistType='playlists') =>{

        // check id validation
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
      newPlaylistInfo = await getPlaylistInfo(playlistId)
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
        let playlistItem= findPlaylistItemById(playlistId)


        console.log(playlistItem)

       if(!playlistItem){
        setLoading(true)
        playlistItem = await getPlaylistItems(playlistId)
        playlistItem.playlistId = playlistId
        setState({...state,playlistItems:[playlistItem,...state.playlistItems]})
        setLoading(false)
       }
       }catch(err){
        setError(err.message)
        setLoading(false)
       }

    }

/**
 * 
 * @param {Stirng} playlistId 
 * TODO:fix bug
 */
    const loadMoreItems =async (playlistId)=>{
        try{
            setLoading(true)
          const oldState = getImmutableData(state)
            let newItems = oldState.playlistItems.find(item => item.playlistId === playlistId)

            if(!newItems.nextPageToken) return

            const  playlistItem = await getPlaylistItems(playlistId,newItems.nextPageToken)  
            newItems = {
                ...newItems,
                ...playlistItem,
                items:[...newItems.items,...playlistItem.items]                
            } 
            console.log('oldState:' , oldState);    
            console.log('newItems:' , newItems)
          setState(oldState)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
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
