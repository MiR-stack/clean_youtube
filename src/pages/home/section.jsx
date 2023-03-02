import { Container, Typography } from "@mui/material"
import Card from "./card"


const Section = ({title,items})=>{
    
    return <Container maxWidth={'lg'}>
        <Typography component={'h2'} variant={'h2'}>{title} </Typography>

        <Grid container spacing={2} >
            {items.map(item=><Card {...item} /> )}
        </Grid>
    </Container>
}

export default Section