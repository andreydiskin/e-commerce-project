import React, { useState, useContext } from "react";
import MyForm from "../common/myForm/MyForm";
import * as yup from "yup";
import { Box, Typography } from "@mui/material";
import "./LoginForm.css";
import {
  getSecretQuestionApiCall,
  sendSecretAnswerApiCall,
} from "../../services/apicalls";
import { toastContext } from "../../context/toastContext";
import { authContext } from "../../context/authContext";
import { storeIsLoggedIn } from "../../Auth/user";
import { useNavigate } from "react-router-dom";
const verifiedinputs = [
  {
    ref: "secretAnswer",
    type: "text",
    label: "Secret Answer",
  },
];

const inputs = [
  {
    ref: "username",
    type: "text",
    label: "Username",
  },
];

const verifiedDeafultConfig = {
  secretAnswer: "",
};

const deafultConfig = {
  username: "",
};

export default function ForgotPasswordForm(props) {
  const [isVerified, setIsVerified] = useState(false);
  const [userName, setUserName] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("temp Question?");
  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();
  const { setIsUser } = useContext(authContext);
  const getVerifiedValidationSchema = yup.object({
    secretAnswer: yup
      .string("Enter your Secret Answer")
      .required("Secret Answer is required to reset your password"),
  });

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("must write your username to reset your password"),
  });

  const getQuestion = async (values) => {
    try {
      await getSecretQuestionApiCall(values.username, (question) => {
        setSecretQuestion(question);
        setIsVerified(true);
        setUserName(values.username);
      });
    } catch (error) {
      openToast(error.response.data, "error");
    }
  };

  const checkSecretAnswer = async (values) => {
    try {
      await sendSecretAnswerApiCall(values.secretAnswer, userName, () => {
        setIsUser(storeIsLoggedIn());
        openToast("Successfully Signed-Up! Happy shopping!", "success");
        props.setIsLoginModalOpen(false);
        navigate("/cart");
      });
    } catch (error) {
      openToast(error.response.data, "error");
    }
  };
  return (
    <Box className="LoginformCon ">
      {isVerified ? (
        <>
          <MyForm
            validationSchema={getVerifiedValidationSchema}
            header={"Secret Question"}
            inputs={verifiedinputs}
            submitMsg={"Submit"}
            deafultConfig={verifiedDeafultConfig}
            setIsLoginModalOpen={props.setIsLoginModalOpen}
            callback={checkSecretAnswer}
          />
        </>
      ) : (
        <MyForm
          validationSchema={validationSchema}
          header={"Verify Username"}
          inputs={inputs}
          submitMsg={"Submit"}
          deafultConfig={deafultConfig}
          setIsLoginModalOpen={props.setIsLoginModalOpen}
          callback={getQuestion}
        />
      )}
      <Typography
        onClick={() => props.setIsForgotPassword(false)}
        variant="caption"
        display="block"
        gutterBottom
      >
        Back to Login
      </Typography>
    </Box>
  );
}
