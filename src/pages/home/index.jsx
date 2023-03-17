import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useHome from "./hooks/useHome";
import Section from "./section/section";

const Empty = () => {
  return (
    <Container sx={{ height: "80vh", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textTransform: "capitalize",
          width:{xs:'300px',sm:'unset'}
        }}
      >
        <Typography variant="h4">
          {" "}
          look like you didn't added any playlist yet!
        </Typography>
      </Box>
    </Container>
  );
};

const Home = () => {
  const { recentItems, favouriteItems, info } = useHome();

  return (
    <Container>
      {info.length < 1 && <Empty />}
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
