import { Container } from "@mui/material"
import Section from './section'

const Home = ({playlistInfo}) =>{
    return <Container>
        <Section title='playlists' items={playlistInfo.playlists} />
    </Container>
}
export default Home