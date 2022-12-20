import { Grid, Typography } from "@mui/material";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";

export default function ItemsGrid(props) {
  return (
    <Grid
      className="myItemsGrid"
      container
      spacing={2}
      columnSpacing={{ xs: 3 }}
      columns={{ xs: 12, sm: 6, md: 3 }}
    >
      {props.userItems?.length ? (
        props.userItems.map((item) => (
          <Grid
            item
            xs={props.gridColumns}
            sm={props.gridColumns}
            md={props.gridColumns / 2}
            key={item._id}
          >
            <ItemCard
              setItems={props.setItems}
              redirectCallback={props.redirectCallback}
              showStatus={props.showStatus}
              amountEditable={props.amountEditable}
              itemPositionChangeCallback={props.itemPositionChangeCallback}
              key={item._id}
              data={item}
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
