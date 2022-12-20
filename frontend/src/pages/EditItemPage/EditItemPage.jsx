import React, { useState, useEffect, useContext } from "react";
import "./EditItemPage.css";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";
import MyForm from "../../components/common/myForm/MyForm";
import * as yup from "yup";
import { uploadImage } from "../../services/apicalls";
import { imgsBucketUrl, seeMoreItemBaseUrl } from "../../Lib/config";
import Loader from "../../components/common/Loader/Loader";
import {
  getItemByIdService,
  updateItemByIdService,
} from "../../services/itemsApiCalls";
import { toastContext } from "../../context/toastContext";

export default function EditItemPage() {
  let { id } = useParams();
  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    //for the pic in the head
    const getItemById = async () => {
      try {
        await getItemByIdService(id, setItem);
      } catch (error) {
        openToast(error.message, "error");
      }
    };
    getItemById();
  }, [id]);

  const chooseFile = async (e) => {
    try {
      const imgName = await uploadImage(e.target);
      await updateItemByIdService(id, { img: imgName }, setItem);
      openToast("Image uploaded", "success");
      return imgName;
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const updateItem = async (data) => {
    try {
      await updateItemByIdService(id, data, setItem);
      openToast("Product updated", "success");
      navigate(seeMoreItemBaseUrl + id);
    } catch (error) {
      openToast(error.message, "error");
    }
  };
  const inputs = [
    { type: "text", ref: "title", label: "Title" },
    { type: "number", ref: "price", label: "Price" },
    { type: "text", ref: "desc", label: "Description" },

    {
      options: [
        { optionName: "toys", value: "toys" },
        { optionName: "electronics", value: "electronics" },
        { optionName: "food", value: "food" },
        ,
      ],
      type: "select",
      ref: "categories",
      label: "Category",
    },
    { onFilePick: chooseFile, type: "file", ref: "img", label: "Picture" },
    { ref: "size", label: "Size", type: "text" },
    { ref: "color", label: "Color", type: "text" },
  ];
  const categories = /toys|electronics|food/;
  let itemsSchema = yup.object({
    title: yup.string("name must be a string").required("Must have name field"),

    img: yup.mixed().required("Picture is required"),

    categories: yup
      .string("Has to be a string")
      .matches(categories, "category must be one of the Toys,Electronics,Food")
      .required("Category Status is required"),
    price: yup.number("Has to be a  number").required("price is required"),
    desc: yup.string("Has to be a  string").required("description is required"),
    size: yup.string("Has to be a  string").required("size is required"),
    color: yup.string("Has to be a  string").required("color is required"),
  });

  const configInputs = {
    title: item?.title,
    img: item?.img,
    size: item?.size,
    color: item?.color,
    price: item?.price,
    desc: item?.desc,
    categories: item?.categories[0],
  };

  if (!item) {
    return <Loader />;
  }
  return (
    <>
      <CardMedia
        component="img"
        className="editPagePetImg"
        image={imgsBucketUrl + item.img}
      />
      <Box className="editPetFormCon addItemCon">
        <MyForm
          validationSchema={itemsSchema}
          header={"Edit Item"}
          inputs={inputs}
          submitMsg={"save"}
          deafultConfig={configInputs}
          callback={updateItem}
        />
      </Box>
    </>
  );
}
