import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  addRecent,
  removeFavourite,
  removePlaylistInfo,
  removeRecent,
} from "../../../store/playlistsInfo";
import { isExist } from "../../../utils";
import {
  addPlaylistItems,
  removePlaylistItems,
} from "../../../store/playlistItems";
import { CardActions, Stack, Button, Tooltip, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { playlistId as id } from "../../../store/player";
import {useNavigate} from 'react-router-dom'


const Actions = ({ playlistId }) => {
  const dispatch = useDispatch();

  //check if item listed in favourite
  const favourite = useSelector((state) => state.playlistsInfo.favorite);
  const isFavourite = isExist(favourite, playlistId);



  const deletePlaylist = () => {
    dispatch(removePlaylistInfo(playlistId));
    dispatch(removePlaylistItems(playlistId));
    dispatch(removeFavourite(playlistId));
    dispatch(removeRecent(playlistId));
  };

  const navigate = useNavigate()

  const handlePlayer = () => {
    dispatch(addPlaylistItems(playlistId));
    dispatch(addRecent(playlistId));
    dispatch(id(playlistId))
    navigate('/player')
  };

  return (
    <CardActions>
      <Button
        component={"h2"}
        href="/player"
        sx={{ color: "#424242" }}
        onClick={handlePlayer}
      >
        <PlayCircleFilledIcon sx={{ mr: 1 }} />
        play
      </Button>

      <Box sx={{ flexGrow: 1 }} />
      <Stack direction={"row"} sx={{ cursor: "pointer" }}>
        {/* add or remove favorite item */}
        <Tooltip title="favourite" placement="top" arrow>
          {isFavourite ? (
            <IconButton
              onClick={() => {
                dispatch(removeFavourite(playlistId));
              }}
            >
              <FavoriteIcon color="error" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                dispatch(addFavorite(playlistId));
              }}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </Tooltip>

        {/* delete playlist */}
        <Tooltip title="delete" placement="top" arrow>
          <IconButton onClick={deletePlaylist}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    </CardActions>
  );
};

export default Actions;
