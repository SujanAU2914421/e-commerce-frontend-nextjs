"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { addToWishList, fetchWishlist, removeFromWishList } from "@/lib/wishListHandle";
import { addToCart, fetchAllCart, removeFromCart } from "@/lib/cartsHandle";

const UserInterractionContext = createContext();

export default function UserInterractionContextProvider({ children }) {
	const [wishList, setWishList] = useState([]); // Wishlist state
	const [cartItems, setCartItems] = useState([]); // Wishlist state
	const { user } = useAuthContext(); // Get user from AuthContext

	useEffect(() => {
		if (user) {
			fetchWishlist(setWishList);
			fetchAllCart(setCartItems);
		} else {
			setWishList([]);
			setCartItems([]);
		}
	}, [user]);

	return (
		<UserInterractionContext.Provider
			value={{
				wishList,
				setWishList,
				addToWishList,
				removeFromWishList,
				cartItems,
				setCartItems,
				addToCart,
				removeFromCart,
			}}
		>
			{children}
		</UserInterractionContext.Provider>
	);
}

// Custom hook to use the UserInterractionContext
export const useUserInterractionContext = () => useContext(UserInterractionContext);
