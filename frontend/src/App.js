import React, { useState } from "react";

import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SidePanel from "./components/SidePanel/SidePanel";
import HomePage from "./pages/HomePage/HomePage";
import AuthModal from "./components/AuthModal/AuthModal";
import SearchPage from "./pages/Search/SearchPage";
import { SecureRoute } from "./Auth/SecureRoute";
import { Typography } from "@mui/material";
import { ToastContextProvider } from "./context/toastContext";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProfileSettingsForm from "./components/ProfileSettingsForm/ProfileSettingsForm";
import { CurrencyContextProvider } from "./context/currencyContext";

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

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </CurrencyContextProvider>
              {/* for the modal opening logic */}
          <AuthModal
            isLoginModalOpen={isLoginModalOpen}
            isLogin={isLogin}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
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
