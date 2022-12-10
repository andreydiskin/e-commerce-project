import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../../../context/toastContext";
import { editItemBaseUrl, editPetBaseUrl, seeMorePetBaseUrl } from "../../../../Lib/config";
import { getPetsByQueryService } from "../../../../services/petsApiCalls";
import Loader from "../../../common/Loader/Loader";
import ItemCard from "../../../ItemCard/ItemCard";
import { mockItems } from "../../../../Lib/data";
import "./AdminItemList.css"
export default function AdminItemList() {
  const [items, setItems] = useState(mockItems);
  const [isLoading, setIsLoading] = useState(false);

  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();

  useEffect(() => {
    // const getPets = async () => {
    //   try {
    //     setIsLoading(true);
    //     await getPetsByQueryService("", setPets);
    //     setIsLoading(false);
    //   } catch (error) {
    //     setIsLoading(false);
    //     openToast(error.message, "error");
    //   }
    // };
    // getPets();
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
          <Grid item className="gridItemAdmin" xs={12} sm={6} md={3} lg={2} key={item.id}>
            <ItemCard
              
              redirectCallback={(e) => navigate(seeMorePetBaseUrl + item._id)}
              showStatus={false}
              key={item.id}
              data={item}
              anotherButton={
                <Button onClick={() => navigate(editItemBaseUrl + item.id)}>
                  Edit
                </Button>
              }
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h5">No Pets...</Typography>
        </Grid>
      )}
    </Grid>
  );
}
