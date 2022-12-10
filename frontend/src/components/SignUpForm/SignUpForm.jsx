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
  username: yup.string("Enter your username").required("Username is required"),

});

// use my form object type for signup form

const inputs = [
    { ref: "email", label: "Email", type: "email" },
    { ref: "username", label: "Username", type: "text" },
    { ref: "password", label: "Password", type: "password" },
    { ref: "repeatPassword", label: "Repeat Password", type: "password" },
    {
      ref: "paymentMethod",
      label: "Payment Method",
      type: "select",
      options: [
        { optionName: "Cash", value: "cash" },
        { optionName: "Credit", value: "credit" },
      ],
    },
    // secret question select
    {
      ref:"secretQuestion",
      label: "Secret Question",
      type: "select",
      options: [
        { optionName: "What is your pet name?", value: "petName" },
        { optionName:"Where were you born?", value:  "birthPlace" },
        { optionName:"What is your favorite food?", value: "favoriteFood"  },
      ],
    }
      ,
    { ref: "secretAnswer", label: "Secret Answer", type: "text" },
    



];

const deafultConfig = {
  username: "",
  email: "",
  password: "",
  paymentMethod: "cash",
  repeatPassword: "",
  secretQuestion: "petName",
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
        setIsLoginModalOpen={props.setIsLoginModalOpen}
        callback={onSubmit}
      />
         </Box>
  );
}
