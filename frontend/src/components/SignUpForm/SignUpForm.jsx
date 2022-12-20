import React, { useContext } from "react";
import Box from "@mui/material/Box";
import "./SignUpForm.css";
import * as yup from "yup";
import { signUpService } from "../../services/usersApiCalls";
import { toastContext } from "../../context/toastContext";
import MyForm from "../common/myForm/MyForm";
import { authContext } from "../../context/authContext";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string("Enter your phone number")
    .required("Phone number is required"),
  address: yup.string("Enter your address").required("Address is required"),
  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password is not STRONG enough-should contain letters and number!"
    )
    .required("Password is required"),
  secretQuestion: yup
    .string("Pick your secret question")
    .required("Secret question is required"),
  secretAnswer: yup
    .string("Enter your secret answer")
    .required("Secret answer is required"),
  paymentMethod: yup
    .string("Pick your payment method")
    .required("Payment method is required"),
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
  { ref: "phoneNumber", label: "Phone Number", type: "text" },
  { ref: "address", label: "Address", type: "text" },
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
    ref: "secretQuestion",
    label: "Secret Question",
    type: "select",
    options: [
      { value: "What is your pet name?", optionName: "What is your pet name?" },
      { value: "Where were you born?", optionName: "Where were you born?" },
      {
        value: "What is your favorite food?",
        optionName: "What is your favorite food?",
      },
    ],
  },
  { ref: "secretAnswer", label: "Secret Answer", type: "text" },
];

const deafultConfig = {
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
  paymentMethod: "cash",
  repeatPassword: "",
  secretQuestion: "petName",
  secretAnswer: "",
};
export default function SignUpForm(props) {
  const { openToast } = useContext(toastContext);
  const { login } = useContext(authContext);

  const onSubmit = async (values) => {
    try {
      const resp = await signUpService(
        values,
        props.setIsLoginModalOpen,
        login
      );

      openToast("Successfully Signed-Up! Happy shopping!", "success");
    } catch (err) {
      console.log(err);
      openToast(err.response.data, "error");
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
