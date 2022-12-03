// Context
import React, { createContext, useEffect, useState } from 'react';
import { nis, usd } from '../Lib/config';

// Context
export const CurrencyContext = createContext();

// Provider
export const CurrencyContextProvider = (props) => {
    const [currency, setCurrency] = useState(nis);



    const currPrice = (price) => {
        if (currency === usd) {
            return `$${calcFromNisToUsd(price)}`;
        } 
          
         else if (currency === nis) {
            return `₪${price}`;
        }
    }

    const returnCurrencyIcon = currency === nis ? '₪' : '$';

    const calcFromNisToUsd = (nis) => {
        return nis / 3.3;
    };
    
    return (
        <CurrencyContext.Provider value={{ currency, setCurrency,currPrice,returnCurrencyIcon }}>
        {props.children}
        </CurrencyContext.Provider>
    );
    }