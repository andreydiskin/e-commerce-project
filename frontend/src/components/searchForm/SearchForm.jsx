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
import { toastContext } from "../../context/toastContext";
import { CurrencyContext } from "../../context/currencyContext";
import { getItemsByQueryService } from "../../services/itemsApiCalls";

const searchValidationSchema = yup.object({
  minHeight: yup.number("Only numbers").positive("Must be a positive number"),
  maxHeight: yup.number("Only numbers").positive("Must be a positive number"),
  minWeight: yup.number("Only numbers").positive("Must be a positive number"),
  maxWeight: yup.number("Only numbers").positive("Must be a positive number"),
  name: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

export default function SearchForm(props) {
  const [formType, setFormType] = useState("basic");
  const { openToast } = useContext(toastContext);
  const {returnCurrencyIcon} = useContext(CurrencyContext);
  const formik = useFormik({
    initialValues: {
      type: "",
      category: "",
      name: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
    },
    validationSchema: searchValidationSchema,

    onSubmit: async (values) => {
      // return an object (transfer to string)
      const query = new URLSearchParams(values).toString();

      try {
        props.setIsLoading(true);
        await getItemsByQueryService(query, props.setSearchPets);
        props.setIsLoading(false);
      } catch (err) {
        openToast(err.message, "error");
        props.setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formType === "basic") {
      formik.setFieldValue("minHeight", "");
      formik.setFieldValue("maxHeight", "");
      formik.setFieldValue("minWeight", "");
      formik.setFieldValue("maxWeight", "");
      formik.setFieldValue("category", "");
      formik.setFieldValue("name", "");
    }
  }, [formType]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} className="formCon">
        <Box>
       
           
              <TextField
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              variant="standard"
              fullWidth
              label="Name"
              value={formik.values.name}
              name="name"/>
            
       
          {formType === "advance" && (
            <>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  name="category"
                  multiple={false}
                >
                  {["type1", "type2", "type3"].map((item) => (
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
                  helperText={
                    formik.touched.minPrice && formik.errors.minPrice
                  }
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
                  helperText={
                    formik.touched.maxPrice && formik.errors.maxPrice
                  }
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
