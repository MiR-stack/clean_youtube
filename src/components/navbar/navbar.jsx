import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import Inputbase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import NavModal from './modal'
import { useState } from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = ({handleId}) =>{

    const [open,setOpen] = useState(false)

    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }

    return <AppBar position='fixed' color='inherit'>
        <Container maxWidth='lg'>
            <Toolbar>
                <Box component='a' href='/' sx={{color:'black',textDecoration:'none', display:'flex' ,alignItems:'center'}} >
                <YouTubeIcon sx={{mr:1, display:{xs:'none',sm:'flex'} }} />
                <Typography variant='h6' > Clean Youtube</Typography>
                </Box>
                
                <Box sx={{flexGrow:1}} />
                <Button variant='contained' color='primary' sx={{textTransform:'capitalize'}} onClick={handleOpen} >add playlist</Button>
                <NavModal open={open} handleClose={handleClose} handleId={handleId} />
            </Toolbar>
        </Container>
    </AppBar> 
}

export default Navbar