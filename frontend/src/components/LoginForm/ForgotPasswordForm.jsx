import React from 'react'
import MyForm from '../common/myForm/MyForm'
import * as yup from "yup";
import { Box, Typography } from '@mui/material';
import "./LoginForm.css"
const inputs = [
    {
        ref: 'secretQuestion',
        type: 'text',
        label: 'Secret Question',
    },
    {
        ref: 'secretAnswer',
        type: 'text',
        label: 'Secret Answer',
    },
    ]

const deafultConfig = {
    secretAnswer:"" ,
    secretQuestion:"" ,
}

export default function ForgotPasswordForm(props) {

    const validationSchema = yup.object({
        secretAnswer: yup
          .string("Enter your Secret Answer")
          .required("Secret Answer is required to reset your password"),
    });

    const onSubmit = async (values) => {
        console.log(values)
    }
  return (
    <Box className="LoginformCon ">
    <MyForm 
    validationSchema={validationSchema}
    header={"Forgot Password"}
    inputs={inputs}
    submitMsg={"Submit"}
    deafultConfig={deafultConfig}
    callback={onSubmit}
    />
    <Typography onClick={()=>props.setIsForgotPassword(false)} variant="caption" display="block" gutterBottom className="forgotPassword"> 
        Back to Login
</Typography>
    </Box>


  )
}
