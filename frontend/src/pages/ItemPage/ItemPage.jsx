import React, { useState, useEffect } from "react";
import "./ItemPage.css";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardMedia } from "@mui/material";
import { imgsBucketUrl } from "../../Lib/config";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

import {
  addItemToCartService,
  addItemToWishListService,
  checkIfProductInWishListService,
  getItemByIdService,
  removeItemFromWishListService,
} from "../../services/itemsApiCalls";
import Loader from "../../components/common/Loader/Loader";
import { toastContext } from "../../context/toastContext";
import ItemDesc from "../../components/common/ItemDesc";

export default function ItemPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const { user, isUser, refreshUser } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const [item, setItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState();

  useEffect(() => {
    const getItem = async () => {
      try {
        setIsLoading(true);
        if (user._id !== undefined) {
          await checkIfProductInWishListService(user._id, id, setIsSaved);
        }
        await getItemByIdService(id, setItem);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        openToast(error.message, "error");
        setIsLoading(false);
      }
    };

    getItem();
  }, [id, user]);

  const removeItemFromWishList = async () => {
    try {
      setIsLoading(true);
      await removeItemFromWishListService(user._id, id, () =>
        setIsSaved(false)
      );
      setIsLoading(false);
      openToast("Item removed from wishlist", "success");
    } catch (error) {
      console.log(error);
      openToast(error.message, "error");
      setIsLoading(false);
    }
  };

  const addItemToCart = async (itemId) => {
    try {
      setIsLoading(true);
      // need to figure this out!!!
      await addItemToCartService(itemId, 1, user._id, (data) => {
        navigate("/cart");
      });

      setIsLoading(false);
      openToast("Item added to cart", "success");
    } catch (error) {
      console.log(error);
      openToast(error.response.data.message, "error");
      setIsLoading(false);
    }
  };

  const addItemToWishList = async (itemId) => {
    try {
      setIsLoading(true);
      await addItemToWishListService(id, user._id, () => navigate("/wishlist"));

      setIsLoading(false);
      openToast("Item added to wishlist", "success");
    } catch (error) {
      console.log(error);
      openToast(error.response.data.message, "error");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !item) {
    return <h1>Item not found</h1>;
  }

  return (
    <>
      <Card className="petPageCon">
        <CardMedia
          component="img"
          className="petImg"
          src={imgsBucketUrl + item.img}
          alt="green iguana"
        />

        <CardContent className="cardContent">
          <ItemDesc item={item} />
        </CardContent>
        {isUser && (
          <>
            <Button
              className="saveBtn"
              variant="contained"
              color="secondary"
              size="small"
              onClick={!isSaved ? addItemToWishList : removeItemFromWishList}
            >
              {!isSaved ? "Add to wishlist " : "remove from wishlist"}
            </Button>

            <br />

            <Button
              className="saveBtn"
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => addItemToCart(item._id)}
            >
              {"Add to cart "}
            </Button>
          </>
        )}
      </Card>
    </>
  );
}
