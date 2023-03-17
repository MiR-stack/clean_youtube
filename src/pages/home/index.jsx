import {  Container } from "@mui/material";
import useHome from "./hooks/useHome";
import Section from "./section";

const Home = () => {
  
  const {recentItems,favouriteItems,info} =useHome()

  return (
    <Container>
      {favouriteItems.length > 0 && (
        <Section title="Favourite" items={favouriteItems} />
      )}
      {recentItems.length > 0 && <Section title="Recent" items={recentItems} />}
      {info.length > 0 && <Section title="Playlists" items={info} />}
    </Container>
  );
};
export default Home;

// utils


