import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import "./LoginForm.css";
import { Typography } from "@mui/material";
import { loginApiCall } from "../../services/apicalls";
import { authContext } from "../../context/authContext";
import { toastContext } from "../../context/toastContext";
import * as yup from "yup";
import ForgotPasswordForm from "./ForgotPasswordForm";
import MyForm from "../common/myForm/MyForm";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const inputs = [
  { ref: "email", label: "Email", type: "email" },
  { ref: "password", label: "Password", type: "password" },
];

const deafultConfig = {
  email: "",
  password: "",
};

export default function LoginForm(props) {
  const { login } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const [isForgotPassword, setIsForgotPassword] = useState(false);


const onSubmit = async (values) => {
  try {
    await loginApiCall(values, login, props.setIsLoginModalOpen);
    openToast("Successfully Logged-in", "success");
  } catch (error) {
    console.log(error);
    openToast(error.message, "error");
  }
};

  if(isForgotPassword)  return(
    <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword}/>)
   ;

  return (
    <Box className="LoginformCon ">
      <MyForm

        validationSchema={validationSchema}
        header={"Login"}
        inputs={inputs}
        submitMsg={"Login"}
        deafultConfig={deafultConfig}
        callback={onSubmit}
      />
        <Typography onClick={()=>setIsForgotPassword(true)} variant="caption" display="block" gutterBottom className="forgotPassword">
        Forgot your Password?
      </Typography>
     
    </Box>
  );
}
