import React from "react";

import Drawer from "@mui/material/Drawer";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PetsIcon from "@mui/icons-material/Pets";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./SidePanel.css";
import SidePanelItem from "./SidePanelItem";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';
import { Divider } from "@mui/material";

export default function SidePanel(props) {
  return (
    <Drawer
      className="drawer"
      anchor={"left"}
      open={props.isDrawerOpen}
      onClose={() => props.setIsDrawerOpen(false)}
    >
      <SidePanelItem linkName="Home" to="/" iconCompoment={<HomeIcon />} />
      <SidePanelItem
        linkName="Search"
        to="/search"
        iconCompoment={<SearchIcon />}
      />
      <SidePanelItem
        secured={true}
        role="user"
        linkName="My Cart"
        to="/cart"
        iconCompoment={<ShoppingCartIcon />}
      />
      <Divider />
      <SidePanelItem
        secured={true}
        role="user"
        linkName="Wishlist"
        to="/wishlist/:id"
        iconCompoment={<ReceiptLongIcon />}
      />

<SidePanelItem
        secured={true}
        role="user"
        linkName="Purchased"
        to="/purchased/:id"
        iconCompoment={<ShoppingBasketIcon />}
      />

      <SidePanelItem
        secured={true}
        role="admin"
        linkName="Add Item"
        to="/admin/addItem"
        iconCompoment={<AddIcon />}
      />

<SidePanelItem
        secured={true}
        role="admin"
        linkName="Admin"
        to="/admin"
        iconCompoment={<AdminPanelSettingsIcon />}
      />
    </Drawer>
  );
}
