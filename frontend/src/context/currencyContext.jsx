// Context
import React, { createContext, useEffect, useState } from 'react';
import { nis, usd } from '../Lib/config';

// Context
export const CurrencyContext = createContext();

// Provider
export const CurrencyContextProvider = (props) => {
    const [currency, setCurrency] = useState(nis);

    useEffect(() => {
        if (localStorage.getItem('currency')) {
            setCurrency(localStorage.getItem('currency'));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);



    const currPrice = (price) => {
        console.log("currency",currency)
        if (currency === usd) {
            return `$${calcFromNisToUsd(price)}`;
        } 
          
         else if (currency === nis) {
            return `₪${price}`;
        }
    }
// not for view, only for  server
    const reverseCurrPrice = (price) => {
        console.log("currency",currency)
        if (currency === nis) {
            return price;
        } 
          
         else if (currency === usd) {
            return calcFromUSDToNis(price);
        }
    }

    const returnCurrencyIcon = currency === nis ? '₪' : '$';

    const calcFromNisToUsd = (nis) => {
        return (nis / 3.3).toFixed(2);
    };

    const calcFromUSDToNis = (nis) => {
        return (nis * 3.3).toFixed(2);
    };
    
    return (
        <CurrencyContext.Provider value={{ currency, reverseCurrPrice,setCurrency,currPrice,returnCurrencyIcon }}>
        {props.children}
        </CurrencyContext.Provider>
    );
    }