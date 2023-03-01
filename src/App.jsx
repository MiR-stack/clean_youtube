import Navbar from './components/navbar/navbar'
import usePlaylist from './hooks/usePlaylist'

const url = 'https://www.youtube.com/playlist?list=PL9bw4S5ePsEGjT1n5VhWDBUHe5sDYos9L'
const id = 'PL9bw4S5ePsEGjT1n5VhWDBUHe5sDYos9L'

const App  = () =>{


  const {playlistInfo,playlistItems,addPlaylistInfo,addPlaylistItems,removePlaylist} = usePlaylist()


  console.log(playlistInfo, playlistItems)


  return <div>
    <Navbar handleId={addPlaylistInfo} />
  </div>
}

export default App