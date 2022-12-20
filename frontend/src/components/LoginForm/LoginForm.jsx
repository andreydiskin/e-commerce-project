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
  userName: yup.string("Enter your email").required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const inputs = [
  { ref: "userName", label: "UserName", type: "text" },
  { ref: "password", label: "Password", type: "password" },
];

const deafultConfig = {
  userName: "",
  password: "",
};

export default function LoginForm(props) {
  const { login } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const onSubmit = async (values) => {
    try {
      await loginApiCall(values, login, props.setIsLoginModalOpen);
      openToast("Successfully Signed-Up! Happy shopping!", "success");
    } catch (error) {
      console.log(error);
      openToast(error.response.data, "error");
    }
  };

  if (isForgotPassword)
    return (
      <ForgotPasswordForm
        setIsLoginModalOpen={props.setIsLoginModalOpen}
        setIsForgotPassword={setIsForgotPassword}
      />
    );

  return (
    <Box className="LoginformCon ">
      <MyForm
        validationSchema={validationSchema}
        header={"Login"}
        inputs={inputs}
        submitMsg={"Login"}
        deafultConfig={deafultConfig}
        setIsLoginModalOpen={props.setIsLoginModalOpen}
        callback={onSubmit}
      />
      <Typography
        onClick={() => setIsForgotPassword(true)}
        variant="caption"
        display="block"
        gutterBottom
        className="forgotPassword"
      >
        Forgot your Password?
      </Typography>
    </Box>
  );
}
