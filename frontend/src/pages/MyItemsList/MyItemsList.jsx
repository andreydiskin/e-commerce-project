import React, { useState, useEffect, useContext } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Loader from "../../components/common/Loader/Loader";
import { toastContext } from "../../context/toastContext";
import "./MyItemsList.css";
import ItemsGrid from "../../components/common/ItemsGrid";
import AlertDialog from "../../components/common/AlertDialog/AlertDialog";
import { CurrencyContext } from "../../context/currencyContext";
import {
  getCartService,
  purchaseProductsService,
  removeItemFromWishListService,
  removeProductFromCartService,
} from "../../services/itemsApiCalls";
import { getCartUrl, getWishListUrl } from "../../Lib/config";

export default function MyItemsList(props) {
  const { user } = useContext(authContext);
  const { openToast } = useContext(toastContext);

  const { currPrice } = useContext(CurrencyContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currDeletedItem, setCurrDeletedItem] = useState(null);
  const navigate = useNavigate();

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        if (props.fetchUrl === "cart") {
          const url = getCartUrl(user._id);
          await getCartService(url, setItems);
          setIsLoading(false);
        } else {
          const url = getWishListUrl(user._id);
          await getCartService(url, setItems);
          setIsLoading(false);
        }
      } catch (error) {
        openToast(error.message, "error");
        setIsLoading(false);
      }
    };
    getItems();
  }, [user, props.fetchUrl]);

  const goToItemPage = (id) => {
    navigate(`/search/${id}`);
  };

  const removeItemDialogHandler = (id) => {
    setCurrDeletedItem(id);
    setIsOpen(true);
  };

  const purchaseProducts = async () => {
    try {
      await purchaseProductsService(user, totalPrice, (id) =>
        navigate(`/thankyou/${id}`)
      );
      setItems([]);

      openToast("Items purchased successfully", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const removeItem = async (id) => {
    try {
      if (props.fetchUrl === "cart") {
        await removeProductFromCartService(
          user._id,
          currDeletedItem,
          (data) => {
            setItems(data);
          }
        );
        openToast("Item removed successfully from cart", "success");
      } else {
        await removeItemFromWishListService(
          user._id,
          currDeletedItem,
          setItems
        );
        openToast("Item removed successfully from wishlist", "success");
      }
      setIsOpen(false);
    } catch (error) {
      openToast(error.message, "error");
      setIsOpen(false);
    }
  };

  return (
    <Stack className="myPetsCon">
      <Typography className="petsHeader" variant="h2">
        {props.listHeader}{" "}
      </Typography>

      {isLoading ? (
        <Loader />
      ) : (
        <ItemsGrid
          showStatus={true}
          redirectCallback={goToItemPage}
          amountEditable={props.amountEditable}
          itemPositionChangeCallback={(id) => removeItemDialogHandler(id)}
          setItems={setItems}
          userItems={items}
          noDataMsg={"You currently do not have items here."}
          gridColumns={12}
        />
      )}
      {props.purchasedAble && !isLoading && (
        //  calc all items price together and show it in the cart
        <div className="cartTotal">
          <Typography variant="h5">Total: {currPrice(totalPrice)}</Typography>
          {/* button to pruchase */}
          <Button
            onClick={purchaseProducts}
            variant="outlined"
            className="cartPurchaseBtn"
          >
            Purchase
          </Button>
        </div>
      )}
      {/* <MyModal isOpen={isOpen} setIsOpen={setIsOpen}> */}
      <AlertDialog
        headerMsg={`Remove item number ${currDeletedItem}?`}
        alertMsg={`Would you like to remove item number ${currDeletedItem}? `}
        handleClose={() => {
          setIsOpen(false);
        }}
        onApprove={removeItem}
        open={isOpen}
      />
      {/* </MyModal> */}
    </Stack>
  );
}
