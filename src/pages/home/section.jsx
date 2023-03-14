import { Container, Typography ,Grid} from "@mui/material"
import Card from "./card"


const Section = ({title,items})=>{
    console.log(items)
    return <Container maxWidth={'lg'}>
        <Typography component={'h2'} variant={'h2'}>{title} </Typography>
        <Grid container spacing={2} >
            {items.map(item=><Grid xs={12} item sm={6} lg={4}><Card key={item.playlistId} {...item} /> </Grid>)}
        </Grid>
    </Container>
}

export default Section