import React, { useContext, useState } from "react";
import "./SearchResultsList.css";
import PetCard from "../ItemCard/ItemCard";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Loader from "../common/Loader/Loader";
import ItemCard from "../ItemCard/ItemCard";
import { toastContext } from "../../context/toastContext";
import { getCartService } from "../../services/petsApiCalls";

export default function SearchResultsList(props) {
  const navigate = useNavigate();
  const {openToast} = useContext(toastContext);
  const [isLoading, setIsLoading] = useState(false);

  const goToPetPage = (id) => {
    navigate(`/search/${id}`);
  };

  const addItemToCart = async(id) => {
    try {
      setIsLoading(true);
      // need to figure this out!!!
      // await getCartService(cartUrl,id, goToPetPage);
      setIsLoading(false);
      openToast("Item added to cart", "success");
    } catch (error) {
      console.log(error);
      openToast(error.message, "error");
      setIsLoading(false);
    }
  }

  if (props.isLoading) {
    return <Loader />;
  }

  if (!props.data.length && !props.isLoading) {
    return (
      <Box>
        <Typography className="noResHeader" variant="h5">
          No results found.. :(
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {props.data.map((item) => {
        return (
          <ItemCard
            showStatus={true}
            isAddable={true}
            redirectCallback={goToPetPage}
            key={item._id}
            itemPositionChangeCallback={()=>addItemToCart(item._id)}
            data={item}
          />
        );
      })}
    </>
  );
}
