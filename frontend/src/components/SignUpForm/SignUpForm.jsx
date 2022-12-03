import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./SignUpForm.css";
import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { signUpService } from "../../services/usersApiCalls";
import { toastContext } from "../../context/toastContext";
import MyForm from "../common/myForm/MyForm";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password is not STRONG enough-should contain letters and number!"
    )
    .required("Password is required"),
  repeatPassword: yup
    .string("please re write your password")
    .oneOf([yup.ref("password")], "didnt match your password")
    .required("Repeat your password"),
  firstName: yup
    .string("Enter your first name.")
    .required("First Name is required!"),
  lastName: yup
    .string("Enter your last name.")
    .required("Last Name is required!"),
  phoneNumber: yup
    .string("Enter your phone number")
    .required("Phone number is required"),
});

// use my form object type for signup form

const inputs = [
    { ref: "email", label: "Email", type: "email" },
    { ref: "password", label: "Password", type: "password" },
    { ref: "repeatPassword", label: "Repeat Password", type: "password" },
    { ref: "firstName", label: "First Name", type: "text" },
    { ref: "lastName", label: "Last Name", type: "text" },
    { ref: "phoneNumber", label: "Phone Number", type: "text" },
    // shipping address
    { ref: "shippingAddress", label: "Shipping Address", type: "text" },
    // payment method select
    {
      ref: "paymentMethod",
      label: "Payment Method",
      type: "select",
      options: [
        { optionName: "cash", value: "Cash" },
        { optionName: "credit", value: "Credit" },
      ],
    },
    // secret question select
    {
      ref:
        "secret question",
      label: "Secret Question",
      type: "select",
      options: [
        { optionName: "petName", value: "What is your pet name?" },
        { optionName: "birthPlace", value: "Where were you born?" },
        { optionName: "favoriteFood", value: "What is your favorite food?" },
      ],
    }
      ,
    { ref: "secretAnswer", label: "Secret Answer", type: "text" },
    



];

const deafultConfig = {
  email: "",
  password: "",
  repeatPassword: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  shippingAddress: "",
  paymentMethod: "",
  secretQuestion: "",
  secretAnswer: "",
};
export default function SignUpForm(props) {
  const { openToast } = useContext(toastContext);

 const onSubmit =  async (values) => {
  try {
    const resp = await signUpService(values, props.setIsLoginModalOpen);
    openToast("Successfully Signed-Up! Please Login", "success");
  } catch (err) {
    openToast(err.message, "error");
  }
};

 return (
    <Box className="SignUpformCon SignUplinesCon">
      <MyForm 
        validationSchema={validationSchema}
        header={"Sign Up"}
        inputs={inputs}
        submitMsg={"Sign Up"}
        deafultConfig={deafultConfig}
        callback={onSubmit}
      />
         </Box>
  );
}
