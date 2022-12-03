import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./ProfileSettingsForm.css";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import * as yup from "yup";
import { authContext } from "../../context/authContext";
import Loader from "../common/Loader/Loader";
import { updateProfileService } from "../../services/usersApiCalls";
import { toastContext } from "../../context/toastContext";
import MyForm from "../common/myForm/MyForm";
import { CurrencyContext } from "../../context/currencyContext";
import { nis, usd } from "../../Lib/config";

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

const inputs = [
  { type: "text", ref: "email", label: "Email" },
  { type: "password", ref: "password", label: "Password" },
  { type: "text", ref: "firstName", label: "First Name" },
  { type: "text", ref: "lastName", label: "Last Name" },
  { type: "text", ref: "phoneNumber", label: "Phone Number" },
  { ref: "shippingAddress", label: "Shipping Address", type: "text" },

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
    firstName: user.firstName || "",
    password: user.password || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    bio: user.bio || "",
    shippingAddress: user.shippingAddress || "",
    paymentMethod: user.paymentMethod || "",
  };

  const handleUpdateProfile = async (values) => {
    try {
      await updateProfileService(user._id, updateUser, values);
      openToast("Successfully updated the profile", "success");
    } catch (err) {
      console.log("err", err);
      openToast(err.response.data.message, "error");
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
