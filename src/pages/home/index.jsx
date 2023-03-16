import {  Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../../store/playlistsInfo";
import Section from "./section";

const Home = () => {
  const playlist = useSelector((state) => state.playlistsInfo);
  const { info, recent, favorite,error } = playlist;

  const recentItems = createList(info, recent);
  const favouriteItems = createList(info, favorite);

  const {enqueueSnackbar}  = useSnackbar()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(error){
      enqueueSnackbar(error,{variant:'error'})
      dispatch(removeError())
    }
  },[error])

  return (
    <Container>
      {favorite.length > 0 && (
        <Section title="Favourite" items={favouriteItems} />
      )}
      {recent.length > 0 && <Section title="Recent" items={recentItems} />}
      {info.length > 0 && <Section title="Favourite" items={info} />}
    </Container>
  );
};
export default Home;

// utils

const createList = (rootArr, curr) => {
  return curr.reduce((acc, curr) => {
    const item = rootArr.find((item) => item.playlistId === curr);
    acc.push(item);
    return acc;
  }, []);
};
