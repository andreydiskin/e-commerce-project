import { Grid, Typography } from "@mui/material";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import PetCard from "../ItemCard/ItemCard";

export default function ItemsGrid(props) {
  console.log(props)
  return (
    <Grid
      className="myItemsGrid"
      container
      spacing={2}
      columnSpacing={{ xs: 3 }}
      columns={{ xs: 12, sm: 6, md: 3 }}
    >
      {props.userDogs?.length ? (
        props.userDogs.map((pet) => (
          <Grid
            item
            xs={props.gridColumns}
            sm={props.gridColumns}
            md={props.gridColumns / 2}
            key={pet.id}
          >
            <ItemCard
              redirectCallback={props.redirectCallback}
              showStatus={props.showStatus}
              amountEditable={props.amountEditable}
              itemPositionChangeCallback={props.removeCallback}
              key={pet.id}
              data={pet}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12}>
          <Typography className="noPetsHeader" variant="h5">
            {props.noDataMsg}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
