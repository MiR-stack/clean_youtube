import GapRemover from './components/gapRemover'
import Navbar from './components/navbar/navbar'
import usePlaylist from './hooks/usePlaylist'
import Home from './pages/home'

const url = 'https://www.youtube.com/playlist?list=PL9bw4S5ePsEGjT1n5VhWDBUHe5sDYos9L'
const id = "PL9bw4S5ePsEGjT1n5VhWDBUHe5sDYos9L"
const id2 = "PLgH5QX0i9K3p06YY1fyReA2UK8mh_zsiY"

const App  = () =>{


  const {loading,error, playlistInfo,playlistItems,addPlaylistInfo,addPlaylistItems,removePlaylist,loadMoreItems} = usePlaylist()




  return <div>
    <Navbar handleId={addPlaylistInfo} />
    <GapRemover />
    <Home playlistInfo={playlistInfo} />
  </div>
}

export default App