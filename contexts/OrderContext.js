import React, { createContext, useContext } from "react";

const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
	return <OrderContext.Provider value={{}}>{children}</OrderContext.Provider>;
}

export const useOrderContext = () => useContext(OrderContext);
