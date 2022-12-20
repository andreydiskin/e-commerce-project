import React, { useContext, useEffect, useState } from "react";
import "./AdminDashBoard.css";

import { useNavigate } from "react-router-dom";
import MyTable from "../../../common/MyTable";
import { getAllUsersService } from "../../../../services/usersApiCalls";
import { toastContext } from "../../../../context/toastContext";
import AdminItemList from "../AdminItemList/AdminItemList";

export default function AdminDashBoard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { openToast } = useContext(toastContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        await getAllUsersService(setUsers);
      } catch (error) {
        openToast(error.message, "error");
      }
    };
    getUsers();
  }, []);

  const config = [
    { header: "Email", ref: "email" },
    { header: "Username", ref: "username" },
    { header: "Phone", ref: "phoneNumber" },
    { header: "Address", ref: "address" },
  ];

  const onClick = (row) => {
    navigate(`/admin/user/${row._id}`);
  };

  return (
    <>
      <MyTable tableColumns={config} data={users} onRowClick={onClick} />
      <AdminItemList />
    </>
  );
}
