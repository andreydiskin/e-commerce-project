import React, { useState, useEffect, useContext } from "react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Loader from "../../components/common/Loader/Loader";
import { getUserPetsAll } from "../../services/usersApiCalls";
import { toastContext } from "../../context/toastContext";
import {mockItems} from "../../Lib/data";
import "./MyItemsList.css";
import ItemsGrid from "../../components/common/ItemsGrid";
import MyModal from "../../components/MyModal/MyModal";
import AlertDialog from "../../components/common/AlertDialog/AlertDialog";
import { CurrencyContext } from "../../context/currencyContext";
export default function MyItemsList(props) {
  const { user } = useContext(authContext);
  const { openToast } = useContext(toastContext);

const {currPrice}  = useContext(CurrencyContext);

  const [items, setItems] = useState(mockItems);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currDeletedItem, setCurrDeletedItem] = useState(null);
  const navigate = useNavigate();

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.amount;
  }, 0);


  useEffect(() => {
    // const getPets = async () => {
    //   try {
    //     setIsLoading(true);
    //     await getUserPetsAll(user._id, (data) => {
    //       setItems(data);
    //       setIsLoading(false);
    //     });
    //   } catch (error) {
    //     openToast(error.message, "error");
    //     setIsLoading(false);
    //   }
    // };
    // getPets();
  }, [user]);

  const goToPetPage = (id) => {
    navigate(`/search/${id}`);
  };

  const handleToggle = (event, pick) => {
    setIsSaved(pick);
  };

  const removeItem = (id) => {
    console.log("check open")
    setCurrDeletedItem(id);
    setIsOpen(true);
  }

  return (
    <Stack className="myPetsCon">
      <Typography className="petsHeader" variant="h2">
{props.listHeader}      </Typography>
    
      {isLoading ? (
        <Loader />
      ) : (
        // <CartList/>
        <ItemsGrid
          showStatus={true}
          redirectCallback={goToPetPage}
          amountEditable={props.amountEditable}
          removeCallback ={removeItem}
          //arrays of saved or owned pets
          userDogs={mockItems}
          noDataMsg={
           
              "You currently do not have items here."
          }
          gridColumns={12}
        />
      )}{
        props.purchasedAble && !isLoading &&
    //  calc all items price together and show it in the cart
    <div className="cartTotal">
      <Typography variant="h5">Total: {currPrice(totalPrice)}</Typography>
      {/* button to pruchase */}
      <Button variant="outlined" className="cartPurchaseBtn">Purchase</Button>
    </div>

     }
      {/* <MyModal isOpen={isOpen} setIsOpen={setIsOpen}> */}
        <AlertDialog 
        headerMsg={`Remove item number ${currDeletedItem}?`}
        alertMsg={`Would you like to remove item number ${currDeletedItem}? `}
          handleClose={()=>{console.log("check close "+currDeletedItem);setIsOpen(false)}}
          onApprove={()=>{console.log("approved")}}
          open={isOpen}
          />
      {/* </MyModal> */}
    </Stack>
  );
}
