import { Container, Typography, Grid } from "@mui/material";
import Card from "../Card/card";

const Section = ({ title, items }) => {
  return (
    <Container maxWidth={"lg"} sx={{ mb: "10px" }}>
      <Typography
        gutterBottom
        component={"h1"}
        variant={"h4"}
        sx={{ margin: "50px 0 20px 0" }}
        color={"#212121"}
      >
        {" "}
        {title}{" "}
      </Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid key={item.playlistId} xs={12} item sm={6} md={4} lg={3}>
            <Card {...item} />{" "}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section;
