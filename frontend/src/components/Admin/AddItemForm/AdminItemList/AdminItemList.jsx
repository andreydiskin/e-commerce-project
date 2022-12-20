import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../../../context/toastContext";
import { editItemBaseUrl, seeMoreItemBaseUrl } from "../../../../Lib/config";
import { getItemsByQueryService } from "../../../../services/itemsApiCalls";
import Loader from "../../../common/Loader/Loader";
import ItemCard from "../../../ItemCard/ItemCard";
import "./AdminItemList.css";
export default function AdminItemList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        await getItemsByQueryService("", setItems);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        openToast(error.message, "error");
      }
    };
    getProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid
      container
      columnSpacing={{ xs: 0, sm: 4, lg: 12 }}
      rowSpacing={{ xs: 1, lg: 3 }}
      columns={{ xs: 12, sm: 4, md: 6, lg: 8 }}
    >
      {items.length ? (
        items.map((item) => (
          <Grid
            item
            className="gridItemAdmin"
            xs={12}
            sm={6}
            md={3}
            lg={2}
            key={item._id}
          >
            <ItemCard
              redirectCallback={(e) => navigate(seeMoreItemBaseUrl + item._id)}
              showStatus={false}
              key={item.id}
              data={item}
              anotherButton={
                <Button onClick={() => navigate(editItemBaseUrl + item._id)}>
                  Edit
                </Button>
              }
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h5">No Items...</Typography>
        </Grid>
      )}
    </Grid>
  );
}
