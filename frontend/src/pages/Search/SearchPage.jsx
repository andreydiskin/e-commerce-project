import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchForm from "../../components/searchForm/SearchForm";
import SearchResultsList from "../../components/SearchResultsList/SearchResultsList";
import { mockItems } from "../../Lib/data";
import "./SearchPage.css";

export default function SearchPage() {
  const [searchedItems, setSearchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Stack className="searchPageCon">
      <Typography variant="h2">Search for an Item</Typography>
      <SearchForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSearchedItems={setSearchedItems}
       
      />
      <SearchResultsList   isLoading={isLoading} data={searchedItems} />
    </Stack>
  );
}
