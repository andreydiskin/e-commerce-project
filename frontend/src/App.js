import React, { useState } from "react";

import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SidePanel from "./components/SidePanel/SidePanel";
import HomePage from "./pages/HomePage/HomePage";
import AuthModal from "./components/MyModal/MyModal";
import SearchPage from "./pages/Search/SearchPage";
import PetPage from "./pages/ItemPage/ItemPage";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminDashBoard from "./components/Admin/AddPetForm/AdminDashBoard/AdminDashBoard";
import UserDetails from "./pages/UserDetails/UserDetails";
import { SecureRoute } from "./Auth/SecureRoute";
import { Typography } from "@mui/material";
import { ToastContextProvider } from "./context/toastContext";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProfileSettingsForm from "./components/ProfileSettingsForm/ProfileSettingsForm";
import { CurrencyContextProvider } from "./context/currencyContext";
import MyItemsList from "./pages/MyItemsList/MyItemsList";
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItemForm from "./components/Admin/AddPetForm/AddItemForm";
import EditItemPage from "./pages/EditItemPage/EditItemPage";
import AuthForm from "./components/AuthForm/AuthForm";
import MyModal from "./components/MyModal/MyModal";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <CssBaseline />
      <Container className="con" maxWidth="100%" disableGutters>
        <ToastContextProvider>
        
          <NavBar
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            setIsLogin={setIsLogin}
          />

          <SidePanel
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
  <CurrencyContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {
              <Route
                path="/profile/"
                element={
                  <SecureRoute role="user">
                    <ProfileSettingsForm />
                  </SecureRoute>
                }
              />
            }

            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:id" element={<ItemPage />} />
            
            <Route path="/items/edit/:id" element={<EditItemPage />} />
            <Route
              path="/cart"
              element={
                <SecureRoute role="user">
                  <MyItemsList purchasedAble={true} amountEditable={true} listHeader="my cart list" />
                </SecureRoute>
              }
            />
             <Route
              path="/wishlist"
              element={
                <SecureRoute role="user">
                  <MyItemsList listHeader="My wishlist" />
                </SecureRoute>
              }
            />


            <Route
              path="/admin"
              element={
                <SecureRoute role="admin">
                  <AdminPage />
                </SecureRoute>
              }
            >
              <Route path="" element={<AdminDashBoard />} />
              <Route path="additem" element={<AddItemForm />} />
              <Route path="user/:id" element={<UserDetails />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </CurrencyContextProvider>
       
          <MyModal
            isOpen={isLoginModalOpen}
            isLogin={isLogin}
            setIsOpen={setIsLoginModalOpen}
          >
         
            

          </MyModal>
        </ToastContextProvider>
      </Container>

      <footer className="footer">
        <Typography align="center" gutterBottom>
          © Andrey Diskin, Marco Magisano, 2022
        </Typography>
      </footer>
    </>
  );
}

export default App;
