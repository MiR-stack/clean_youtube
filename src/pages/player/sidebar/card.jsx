import { Card, CardContent, CardMedia, Typography } from "@mui/material"


const ItemCard  =({title,channelTitle}) =>{
    return (
        <Card >
            <CardMedia image="" alt={title} />
            <CardContent>
                <Typography variant="subtitle2" component='h3'>{`${title.length >40 ? title +'...':title}`} </Typography>
                <Typography variant="caption" >{channelTitle} </Typography>
            </CardContent>
        </Card>
    )
}