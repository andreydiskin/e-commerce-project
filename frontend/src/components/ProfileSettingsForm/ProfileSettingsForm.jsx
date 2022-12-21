import React, { useContext } from "react";
import Box from "@mui/material/Box";
import "./ProfileSettingsForm.css";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import * as yup from "yup";
import { authContext } from "../../context/authContext";
import Loader from "../common/Loader/Loader";
import { updateProfileService } from "../../services/usersApiCalls";
import { toastContext } from "../../context/toastContext";
import MyForm from "../common/myForm/MyForm";
import { CurrencyContext } from "../../context/currencyContext";
import { nis, usd } from "../../Lib/config";

const validationSchema = yup.object({
  address: yup.string("Enter your address").required("Address is required"),
  paymentMethod: yup
    .string("Pick your payment method")
    .required("Payment method is required"),
  secretAnswer: yup
    .string("Enter your secret answer")
    .required("Secret answer is required"),
  secretQuestion: yup
    .string("Pick your secret question")
    .required("Secret question is required"),
  username: yup.string("Enter your username").required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?_])[A-Za-z\d#$@!%&*?_]{8,30}$/,
      "Password is not strong enough - should be 8 characters long and contain letters and number!"
    )
    .required("Password is required"),

  phoneNumber: yup
    .string("Enter your phone number")
    .required("Phone number is required"),
});

const inputs = [
  { type: "text", ref: "email", label: "Email" },
  { type: "password", ref: "password", label: "Password" },
  { type: "text", ref: "username", label: "Username" },
  {
    type: "select",
    ref: "secretQuestion",
    label: "Secret Question",
    options: [
      { optionName: "What is your pet name?", value: "petName" },
      { optionName: "Where were you born?", value: "birthPlace" },
      { optionName: "What is your favorite food?", value: "favoriteFood" },
    ],
  },
  { type: "text", ref: "secretAnswer", label: "Secret answer" },
  { type: "text", ref: "phoneNumber", label: "Phone Number" },
  { ref: "address", label: "Shipping Address", type: "text" },

  {
    ref: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      { optionName: "cash", value: "Cash" },
      { optionName: "credit", value: "Credit" },
    ],
  },
];

export default function ProfileSettingsForm(props) {
  const { user, updateUser } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const { currency, setCurrency } = useContext(CurrencyContext);

  const defaultConfig = {
    email: user.email || "",
    password: user.password || "",
    username: user.username || "",
    phoneNumber: user.phoneNumber || "",
    secretQuestion: user.secretQuestion || "",
    secretAnswer: user.secretAnswer || "",
    address: user.address || "",
    paymentMethod: user.paymentMethod || "",
  };

  const handleUpdateProfile = async (values) => {
    try {
      await updateProfileService(user._id, updateUser, values);
      openToast("Successfully updated the profile", "success");
    } catch (err) {
      console.log("err", err);
      openToast(err.message, "error");
    }
  };

  if (!user) {
    return <Loader />;
  }
  return (
    <Box className="ProfileSettingsformCon">
      <ToggleButtonGroup
        color="primary"
        value={currency}
        exclusive
        onChange={(e, value) => setCurrency(value)}
        aria-label="Platform"
      >
        <ToggleButton value={nis}>₪</ToggleButton>
        <ToggleButton value={usd}>$</ToggleButton>
      </ToggleButtonGroup>

      <MyForm
        validationSchema={validationSchema}
        header={"Edit Profile"}
        inputs={inputs}
        submitMsg={"save"}
        deafultConfig={defaultConfig}
        callback={handleUpdateProfile}
      />
    </Box>
  );
}
