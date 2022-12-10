import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { CurrencyContext } from "../../context/currencyContext";

export default function PetDesc(props) {
  const {currPrice}= useContext(CurrencyContext) 
  console.log(props)
  //   id
// name
// description
// type
// category
// price
  return (
    <>
  
  
  <Typography variant="h1" gutterBottom>
    {props.item.name}
  </Typography>
  <Typography variant="h5" color="text.secondary" gutterBottom>
    item id: {props.item.id}
  </Typography>

    <Typography variant="h5" color="text.secondary" gutterBottom>
    Description: {props.item.description}
    </Typography>
    <Typography variant="h5" color="text.secondary" gutterBottom>
    Category: {props.item.category}
    </Typography>
    <Typography variant="h5" color="text.secondary" gutterBottom>
    Price: {currPrice(props.item.price) }
    </Typography>
        <br />
  
    </>
  );
}
