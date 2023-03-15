import { Container, Typography ,Grid} from "@mui/material"
import Card from "./card"


const Section = ()=>{
    return <Container maxWidth={'lg'}>
        <Typography component={'h2'} variant={'h2'}> </Typography>
        <Grid container spacing={2} >
            {/* {items.map(item=><Grid xs={12} item sm={6} lg={4}><Card key={item.playlistId} {...item} /> </Grid>)} */}
        </Grid>
    </Container>
}

export default Section