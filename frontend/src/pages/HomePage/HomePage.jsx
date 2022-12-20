import React, { useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "./HomePage.css";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { CurrencyContext } from "../../context/currencyContext";
import { getNewestItemService } from "../../services/itemsApiCalls";
import { imgsBucketUrl, newestItemsUrl } from "../../Lib/config";
import { toastContext } from "../../context/toastContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { currPrice } = useContext(CurrencyContext);
  const navigate = useNavigate();
  const { openToast } = useContext(toastContext);
  const [newestItems, setNewestItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFeaturedItems = async () => {
      try {
        setIsLoading(true);
        await getNewestItemService(newestItemsUrl, setNewestItems);
        setIsLoading(false);
      } catch (err) {
        openToast(err.message, "error");
        setIsLoading(false);
      }
    };
    getFeaturedItems();
  }, []);
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
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          We have every item you want
        </Typography>{" "}
        <Typography
          className="sub-header"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          So go ahead and buy your favorite products today!
        </Typography>{" "}
      </Stack>

      {Object.entries(newestItems).map(
        ([title, items], i) =>
          items.length && (
            <Box className="itemsShowCaseCon" key={items[0]._id}>
              <h6 className="showCaseCategory">{title}</h6>

              <Box
                className="suggestedCardCon"
                key={items[0]._id}
                sx={{ display: "flex" }}
              >
                {items.map((item) => (
                  <Card className="itemShowCase" key={item._id}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={imgsBucketUrl + item.img}
                      alt="green iguana"
                      key={item._id + "pic"}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currPrice(item.price)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => navigate(`/search/${item._id}`)}
                        size="small"
                      >
                        See More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Box>
          )
      )}
    </>
  );
}
