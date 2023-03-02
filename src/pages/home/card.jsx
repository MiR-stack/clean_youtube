import { Card,CardActions,CardContent,CardMedia,Button, Typography } from "@mui/material"

const Card = ({title,description,thumbnail,palylistId,channelTitle,addFavourite,addRecent})=>{

    return <Card >
        <CardMedia component={'img'} alt={title} height='150px' image={thumbnail.url}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>{title} </Typography>
                <Typography variant='body2' color='text.secondary'>{description} </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'> play</Button>
                <Button size='small'>add to favourite</Button>
            </CardActions>
        </CardMedia>
    </Card>
}

export default Card