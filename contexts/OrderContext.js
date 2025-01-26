"use client";
import axios from "@/config/axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserInterractionContext } from "./UserInterractionContext";
import { useAuthContext } from "./AuthContext";

const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
	const [useSameAddress, setUseSameAddress] = useState(true);
	const [agreeWithTerms, setAgreeWithTerms] = useState(false);

	const { user } = useAuthContext();

	const [orderData, setOrderData] = useState(null);

	const { cartItems, setCartItems } = useUserInterractionContext();

	const [currentViewOrder, setCurrentViewOrder] = useState(null);

	const initialAddressState = {
		email: "",
		firstName: "",
		lastName: "",
		streetAddress: "",
		houseNumberAndStreetName: "",
		apartmentDetails: "",
		city: "",
		state: "",
		zip: "",
		phone: "",
		orderNotes: "",
	};

	useEffect(() => {
		if (user && user.email) {
			setOrderDataInitial((prevData) => ({
				...prevData,
				email: user.email,
			}));
		}
	}, [user]);

	const [orderDataInitial, setOrderDataInitial] = useState(initialAddressState);
	const [billingAddress, setBillingAddress] = useState(initialAddressState);

	const syncBillingAddress = (source) => setBillingAddress(useSameAddress ? { ...source } : initialAddressState);

	useEffect(() => syncBillingAddress(orderDataInitial), [orderDataInitial, useSameAddress]);

	const addOrder = async () => {
		const mergedData = {
			items: cartItems,
			orderAddress: { ...orderDataInitial },
			billingAddress: { ...billingAddress },
		};

		try {
			const response = await axios.post("add-order", mergedData);
			console.log("Order created:", response);
			setCurrentViewOrder(response.order);
			getAllOrder();
			setCartItems(null);
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const updateOrder = async (orderid) => {
		try {
			const response = await axios.post("update-order", {
				order_id: orderid,
				status: "delivered",
				payment_status: "paid",
				orderAddress: { ...orderDataInitial },
				billingAddress: { ...billingAddress },
			});
			console.log("Order updated:", response);
			getAllOrder();
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const getAllOrder = async () => {
		try {
			const response = await axios.get("get-orders");
			if (response.status === 200) {
				setOrderData(response.data);
			}
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const getOrder = async (orderid) => {
		try {
			const response = await axios.post("get-order", { id: orderid });
			if (response.status === 200) {
				setCurrentViewOrder(response.data);
			}
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const cancelOrder = async (id) => {
		try {
			const response = await axios.post("cancel-order", { id: id });
			console.log("Order created:", response);
			getAllOrder();
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	return (
		<OrderContext.Provider
			value={{
				orderDataInitial,
				setOrderDataInitial,
				useSameAddress,
				setUseSameAddress,
				billingAddress,
				setBillingAddress,
				agreeWithTerms,
				setAgreeWithTerms,
				orderData,
				setOrderData,
				cancelOrder,
				addOrder,
				updateOrder,
				getAllOrder,
				getOrder,
				currentViewOrder,
				setCurrentViewOrder,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
}

export const useOrderContext = () => useContext(OrderContext);
