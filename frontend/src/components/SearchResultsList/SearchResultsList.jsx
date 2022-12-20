import React, { useContext, useState } from "react";
import "./SearchResultsList.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Loader from "../common/Loader/Loader";
import ItemCard from "../ItemCard/ItemCard";
import { toastContext } from "../../context/toastContext";
import { addItemToCartService } from "../../services/itemsApiCalls";
import { authContext } from "../../context/authContext";

export default function SearchResultsList(props) {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const [isLoading, setIsLoading] = useState(false);

  const goToItemPage = (id) => {
    navigate(`/search/${id}`);
  };

  const addItemToCart = async (itemId, itemAmount) => {
    try {
      setIsLoading(true);
      // need to figure this out!!!
      await addItemToCartService(itemId, itemAmount, user._id, (data) => {
        navigate("/cart");
      });

      setIsLoading(false);
      openToast("Item added to cart", "success");
    } catch (error) {
      console.log(error);
      openToast(error.message, "error");
      setIsLoading(false);
    }
  };

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
            redirectCallback={goToItemPage}
            key={item._id}
            itemPositionChangeCallback={(amount) =>
              addItemToCart(item._id, amount)
            }
            data={item}
          />
        );
      })}
    </>
  );
}
