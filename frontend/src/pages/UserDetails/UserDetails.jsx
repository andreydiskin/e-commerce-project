import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserTable from "../../components/common/UserTable/UserTable";
import { useState } from "react";
import {
  getUserDataService,
  getUserOrdersService,
} from "../../services/usersApiCalls";
import Loader from "../../components/common/Loader/Loader";
import { toastContext } from "../../context/toastContext";

import "./UserDetails.css";
import MyTable from "../../components/common/MyTable";
import { Typography } from "@mui/material";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const { openToast } = useContext(toastContext);
  const { id } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        await getUserDataService(id, setUser);
        await getUserOrdersService(id, setUserOrders);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        openToast(error.message, "error");
      }
    };

    getUser();
  }, []);

  const navigate = useNavigate();
  const userHeaders = [
    "Id",
    "Email",
    "UserName",
    "Address",
    "Phone Number",
    "Payment Method",
  ];

  const orderHeaders = [
    "userId",
    "address",
    "amount",
    "createdAt",
    "Phone Number",
  ];

  if (!user || isLoading) {
    return <Loader />;
  }

  const ordersConfig = [
    { header: "id", ref: "userId" },

    { header: "Address", ref: "address" },
    { header: "Total price", ref: "amount" },
    { header: "Created At", ref: "createdAt" },
  ];

  const tableData = [
    user._id,
    user.email,
    user.username,
    user.address,
    user.phoneNumber,
    user.paymentMethod,
  ];
  return (
    <div className="userDataCon">
      <Typography variant="h4">User Details</Typography>
      <UserTable data={tableData} headers={userHeaders} id={id} />
      <Typography variant="h4">User Orders</Typography>
      <MyTable
        tableColumns={ordersConfig}
        data={userOrders}
        onRowClick={null}
      />
    </div>
  );
}
