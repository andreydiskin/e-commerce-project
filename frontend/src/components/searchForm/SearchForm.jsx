import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./SearchForm.css";
import * as yup from "yup";
import { getItemsByQueryService } from "../../services/itemsApiCalls";
import { toastContext } from "../../context/toastContext";
import { CurrencyContext } from "../../context/currencyContext";
const categories = /toys|electronics|food/;
const searchValidationSchema = yup.object({
  categories: yup
    .string("has to be string")
    .matches(categories, "category must be one of the Toys,Electronics,Food"),
  minPrice: yup.number("Only numbers").positive("Must be a positive number"),
  maxPrice: yup.number("Only numbers").positive("Must be a positive number"),
  title: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

export default function SearchForm(props) {
  const [formType, setFormType] = useState("basic");
  const { openToast } = useContext(toastContext);
  const { returnCurrencyIcon, reverseCurrPrice } = useContext(CurrencyContext);
  const [sortBy, setSortBy] = useState("Price");
  const formik = useFormik({
    initialValues: {
      type: "",
      categories: "",
      title: "",
      minPrice: "",
      maxPrice: "",
    },
    validationSchema: searchValidationSchema,

    onSubmit: async (values) => {
      let searchedValues = { ...values };
      if (searchedValues.minPrice)
        searchedValues.minPrice = reverseCurrPrice(searchedValues.minPrice);
      if (searchedValues.maxPrice)
        searchedValues.maxPrice = reverseCurrPrice(searchedValues.maxPrice);

      // return an object (transfer to string)
      const query = new URLSearchParams(searchedValues).toString();

      try {
        props.setIsLoading(true);
        await getItemsByQueryService(query, (data) =>
          props.setSearchedItems(() => {
            const sortedItems = data;
            if (sortBy === "Price") {
              sortedItems.sort((a, b) => a.price - b.price);
            } else {
              sortedItems.sort((a, b) => a.title.localeCompare(b.title));
            }
            return [...sortedItems];
          })
        );
        props.setIsLoading(false);
      } catch (err) {
        openToast(err.message, "error");
        props.setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formType === "basic") {
      formik.setFieldValue("minPrice", "");
      formik.setFieldValue("maxPrice", "");
      formik.setFieldValue("categories", "");
      formik.setFieldValue("title", "");
      formik.setFieldValue("type", "");
    }
  }, [formType]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} className="formCon">
        <Box>
          {/* sort mechnizem */}
          <FormControl variant="standard" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              defaultValue="Price"
              name="sortBy"
              multiple={false}
            >
              {["Price", "Name"].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            onBlur={formik.handleBlur}
            variant="standard"
            fullWidth
            label="Title"
            value={formik.values.title}
            name="title"
          />

          {formType === "advance" && (
            <>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  onChange={formik.handleChange}
                  value={formik.values.categories}
                  name="categories"
                  multiple={false}
                >
                  {["toys", "electronics", "food"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box className="petSizeInputs">
                <TextField
                  variant="standard"
                  id="minPrice"
                  name="minPrice"
                  label={`Min Price ${returnCurrencyIcon}`}
                  type="number"
                  value={formik.values.minPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.minPrice && Boolean(formik.errors.minPrice)
                  }
                  helperText={formik.touched.minPrice && formik.errors.minPrice}
                  onBlur={formik.handleBlur}
                />
                <TextField
                  variant="standard"
                  id="maxPrice"
                  name="maxPrice"
                  label={`Max Price ${returnCurrencyIcon}`}
                  type="number"
                  value={formik.values.maxPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.maxPrice && Boolean(formik.errors.maxPrice)
                  }
                  helperText={formik.touched.maxPrice && formik.errors.maxPrice}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </>
          )}
        </Box>

        <Box className="searchBtn">
          <Button disabled={props.isLoading} type="submit" variant="contained">
            Search
          </Button>
          <ToggleButtonGroup
            color="primary"
            value={formType}
            size="small"
            exclusive
            onChange={(e) => {
              setFormType(e.target.value);
            }}
            aria-label="Platform"
          >
            <ToggleButton value="basic">Basic</ToggleButton>

            <ToggleButton value="advance">Advance</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </form>
    </Box>
  );
}
