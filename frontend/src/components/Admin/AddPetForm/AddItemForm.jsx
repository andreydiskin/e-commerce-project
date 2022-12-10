import React, { useContext } from "react";
import MyForm from "../../common/myForm/MyForm";
import * as yup from "yup";
import { uploadImage } from "../../../services/apicalls";
import { useNavigate } from "react-router-dom";
import { addItemService } from "../../../services/petsApiCalls";
import { toastContext } from "../../../context/toastContext";

export default function AddItemForm() {
  const navigate = useNavigate();
  const { openToast } = useContext(toastContext);

  const chooseFile = async (e) => {
    try {
      console.log("e", e.target.files[0]);
      const imgName = uploadImage(e.target);
      openToast("Image uploaded", "success");
      return imgName;
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const addPet = async (data) => {
    try {
      await addItemService(data, (id) => navigate(`/search/${id}`));
      openToast("Item added", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  // color
  // price
  const inputs = [
    { type: "text", ref: "title", label: "Title" },
    { type: "number", ref: "price", label: "Price" },
    { type: "text", ref: "desc", label: "Description" },

    {
      options: [
        { optionName: "toys", value: "Toys" },
        { optionName: "electronics", value: "Electronics" },
        { optionName: "food", value: "Food" },
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

  const configInputs = {
    title: "",
    img: [],
    size: "",
    color: "",
    price: "",
    desc: "",
    categories: "",
  };

  const categories = /Toys|Electronics|Food/;
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
  return (
    <div className="addItemCon">
      <MyForm
        validationSchema={itemsSchema}
        header={"Add Item"}
        inputs={inputs}
        submitMsg={"Submit"}
        deafultConfig={configInputs}
        callback={addPet}
      />
    </div>
  );
}
