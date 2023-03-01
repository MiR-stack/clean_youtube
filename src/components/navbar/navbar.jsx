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
                <Typography variant='h6' component='a' href='/' sx={{color:'black',textDecoration:'none'}}> Clean Youtube</Typography>
                <Box sx={{flexGrow:1}} />
                <Button variant='contained' color='primary' sx={{textTransform:'capitalize'}} onClick={handleOpen} >add playlist</Button>
                <NavModal open={open} handleClose={handleClose} handleId={handleId} />
            </Toolbar>
        </Container>
    </AppBar> 
}

export default Navbar