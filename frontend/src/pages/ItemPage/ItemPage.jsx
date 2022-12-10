import React, { useState, useEffect } from "react";
import "./ItemPage.css";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import PetDesc from "../../components/common/PetDesc";
import IsPetAdoptedByUser from "../../components/common/IsPetAdoptedByUser";
import { imagesBaseUrl } from "../../Lib/config";
import { useContext } from "react";
import { mockItems } from "../../Lib/data";
import { authContext } from "../../context/authContext";

import {
  adoptPetService,
  getPetByIdService,
  returnPetService,
  savePetService,
} from "../../services/petsApiCalls";
import Loader from "../../components/common/Loader/Loader";
import { toastContext } from "../../context/toastContext";

export default function ItemPage() {
  let { id } = useParams();
  const { user, isUser, refreshUser } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const [item, setItem] = useState(mockItems[0]);
  const [isSaved, setIsSaved] = useState();

  useEffect(() => {
    // const getPet = async () => {
    //   try {
    //     await getPetByIdService(id, setItem);
    //   } catch (error) {
    //     openToast(error.message, "error");
    //   }
    // };
    // getPet();
  }, [id]);

  useEffect(() => {
    setIsSaved(user?.savedPets?.includes(id));
  }, [user]);

  const unsavePet = async () => {
    try {
      await savePetService(id, false, refreshUser);

      openToast("Pet unsaved", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const savePet = async () => {
    try {
      await savePetService(id, true, refreshUser);

      openToast("Pet saved", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const returnPet = () => {
    try {
      returnPetService(id, setItem);
      openToast("Pet returned", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const adoptPet = (isAdopt) => {
    try {
      adoptPetService(id, isAdopt, setItem);
      openToast(`Pet ${isAdopt ? "Adopted" : "Fosterd"}`, "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };
  if (!item) {
    return <Loader />;
  }


  return (
    <>
      <Card className="petPageCon">
        <CardMedia
          component="img"
          className="petImg"
          src={item.pic}
          alt="green iguana"
        />
       
        <CardContent className="cardContent">
          <PetDesc item={item} />
         
         </CardContent>
        {isUser && (
          <>
            <Button
              className="saveBtn"
              variant="contained"
              color="secondary"
              size="small"
              onClick={isSaved ? unsavePet : savePet}
            >
              {isSaved ? "Add to wishlist " : "remove from wishlist"}
            </Button>

            <br />

            <Button
              className="saveBtn"
              variant="contained"
              color="secondary"
              size="small"
              onClick={ savePet}
            >
              { "Add to cart "}
            </Button>

        
          </>
        )}
      </Card>
    </>
  );
}
