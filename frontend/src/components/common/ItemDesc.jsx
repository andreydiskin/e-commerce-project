import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { CurrencyContext } from "../../context/currencyContext";

export default function ItemDesc(props) {
  const { currPrice } = useContext(CurrencyContext);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {props.item.title}
      </Typography>
      <Typography variant="h6" color="text.danger" gutterBottom>
        item id: {props.item._id}
      </Typography>

      <Typography variant="h5" color="text.secondary" gutterBottom>
        Description: {props.item.desc}
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Color: {props.item.color}
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Size: {props.item.size}
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Category: {props.item.categories.map((category) => category + " ")}
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Price: {currPrice(props.item.price)}
      </Typography>
      <br />
    </>
  );
}
