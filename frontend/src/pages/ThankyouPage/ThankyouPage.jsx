import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader/Loader";
import { CurrencyContext } from "../../context/currencyContext";
import { toastContext } from "../../context/toastContext";
import { getOrderByIdService } from "../../services/itemsApiCalls";
import "./ThankyouPage.css";

export default function ThankyouPage(props) {
  const { orderid } = useParams();
  const [order, setOrder] = useState(null);
  const { openToast } = useContext(toastContext);
  const { currPrice } = useContext(CurrencyContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsLoading(true);
        await getOrderByIdService(orderid, setOrder);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        openToast(error.message, "error");
        setIsLoading(false);
      }
    };
    getOrder();
  }, []);

  if (!order && isLoading) {
    return <Loader />;
  } else if (!order && !isLoading) {
    return <h1>Order not found</h1>;
  } else
    return (
      <div className="purchaseSection">
        <h1>Thank you for your purchase</h1>
        <h2>Order Id: {order._id}</h2>
        {/* date in a readable format */}
        <h2>Order Date: {new Date(order.createdAt).toDateString()}</h2>
        <h2>Order Total: {currPrice(order.amount)}</h2>
      </div>
    );
}
