import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { FormControl,Button,Input,Box} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPlaylistInfo } from '../../store/playlistsInfo'


const NavModal = ({handleClose,open})=>{

    const style ={
        position:'absolute',
        left:'50%',
        top:'50%',
        transform:'translate(-50%,-50%)',
        background:'white',
        boxShadow:24,
        padding:'20px',
        borderRadius:'10px'
    }

    const [url,setUrl] = useState('')

    const dispatch = useDispatch()

    const handleClick =()=>{
        if(!url) return
        dispatch(addPlaylistInfo(url))
        handleClose()
    }

    return <Modal open={open} onClose={handleClose}>
        <Box style={style}>
            <Typography variant='h5' textAlign='center'>Enter playlist id or url</Typography>
            <FormControl ms={3}>
                <Box sx={{diplay:'flex',alignItems:'center',mt:2}}>
                    <Input placeholder='PL_SLJDFJ_dsdkjf_345jl' onChange={(e)=>{setUrl(e.target.value)}} />
                    <Button variant='contained' color='success' onClick={handleClick} >add</Button>
                </Box>
            </FormControl>
        </Box>
    </Modal>
}

export default NavModal 