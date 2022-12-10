import React, { useState, useEffect, useContext } from "react";
import "./EditItemPage.css";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";
import MyForm from "../../components/common/myForm/MyForm";
import * as yup from "yup";
import { uploadImage } from "../../services/apicalls";
import { imagesBaseUrl, seeMorePetBaseUrl } from "../../Lib/config";
import Loader from "../../components/common/Loader/Loader";
import { getPetByIdService, updatePetById } from "../../services/petsApiCalls";
import { toastContext } from "../../context/toastContext";
import { mockItems } from "../../Lib/data";

export default function EditItemPage() {
  let { id } = useParams();
  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();
  const [pet, setPet] = useState(mockItems[0]);

  useEffect(() => {
    //for the pic in the head
    // const getPetById = async () => {
    //   try {
    //     await getPetByIdService(id, setPet);
    //   } catch (error) {
    //     openToast(error.message, "error");
    //   }
    // };
    // getPetById();
  }, [id]);

  const chooseFile = async (e) => {
    try {
      const imgName = await uploadImage(e.target);
      await updatePetById(id, { pic: imgName }, setPet);
      openToast("Image uploaded", "success");
      return imgName;
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const updatePet = async (data) => {
    try {
      await updatePetById(id, data, setPet);
      openToast("Pet updated", "success");
      navigate(seeMorePetBaseUrl + id);
    } catch (error) {
      openToast(error.message, "error");
    }
  };
  const inputs = [
    { type: "text", ref: "name", label: "Name" },
    { type: "number", ref: "price", label: "Price" },
    {type:"text",ref:"description",label:"Description"},
    {
      options: [
        { optionName: "taxable", value: "taxable" },
        { optionName: "regular", value: "regular" },
        { optionName: "onSale", value: "on sale" },
      
      ],
      type: "select",
      ref: "type",
      label: "Type",
    },
    {
      options: [
        { optionName: "toys", value: "Toys" },
        { optionName: "electronics", value: "Electronics" },
        { optionName: "food", value: "Food" },
        ,
      ],
      type: "select",
      ref: "category",
      label: "Category",
    },
    { onFilePick: chooseFile, type: "file", ref: "pic", label: "Picture" },


   

  ];

  const types = /taxable|regular|on sale/;
  const categories = /Toys|Electronics|Food/;
  let petsSchema = yup.object({
    name: yup
      .string("name must be a string")
      .required("Must have name field"),
   
    pic: yup.mixed().required("Picture is required"),
    type: yup
      .string("Has to be a string")
      .matches(
        types,
        "Type must be one of the taxable,regular,on sale"
      )
      .required("Type is required"),
  
      category: yup
      .string("Has to be a string")
      .matches(
        categories,
        "category must be one of the Toys,Electronics,Food"
      )
      .required("category Status is required"),
    price: yup
      .number("Has to be a  number")
      .required("price is required"),
    description: yup
      .string("Has to be a  string")
      .required("description is required"),

  });

  if (!pet) {
    return <Loader />;
  }
  return (
    <>
      <CardMedia
        component="img"
        className="editPagePetImg"
        image={ pet.pic}
   
      />
      <Box className="editPetFormCon addItemCon">
        <MyForm
          validationSchema={petsSchema}
          header={"Edit Item"}
          inputs={inputs}
          submitMsg={"save"}
          deafultConfig={pet}
          callback={updatePet}
        />
      </Box>
    </>
  );
}
