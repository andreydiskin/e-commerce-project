import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "./HomePage.css";
import { mocksuggestedItems } from "../../Lib/data";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { CurrencyContext } from "../../context/currencyContext";

export default function HomePage() {
  const { currPrice } = useContext(CurrencyContext);
  return (
    <>
      <Stack className="homePageCon" spacing={2}>
        <Typography
          className="header"
          variant="h3"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Welcome to our E-commerce website!
        </Typography>
        <Typography
          className="sub-header"
          variant="h7"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          We have every item you want
        </Typography>{" "}
        <Typography
          className="sub-header"
          variant="h7"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          So go ahead and buy your favorite products today!
        </Typography>{" "}
      </Stack>

      {["cooking", "gaming", "toys"].map((category) => (
        <Box className="itemsShowCaseCon" key={category}>
          {category}
          <Box
            className="suggestedCardCon"
            key={category}
            sx={{ display: "flex" }}
          >
            {mocksuggestedItems.map((item) => (
              <Card className="itemShowCase" key={item.id}>
                <CardMedia
                  component="img"
                  height="140"
                  src={item.pic}
                  alt="green iguana"
                  key={item.id + "pic"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currPrice(item.price)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">See More</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
}
