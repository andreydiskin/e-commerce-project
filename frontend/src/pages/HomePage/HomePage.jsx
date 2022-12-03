import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "./HomePage.css";

export default function HomePage() {
  return (
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
  );
}
