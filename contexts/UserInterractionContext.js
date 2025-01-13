"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { addToWishList, fetchWishlist, removeFromWishList } from "@/lib/wishListHandle";
import { addToCart, fetchAllCart, removeFromCart } from "@/lib/cartsHandle";
import { addComment, fetchAllComments, removeComment, updateComment } from "@/lib/reviewHandle";

const UserInterractionContext = createContext();

export default function UserInterractionContextProvider({ children }) {
	const [wishList, setWishList] = useState([]); // Wishlist state
	const [cartItems, setCartItems] = useState([]); // Wishlist state
	const [comments, setComments] = useState([]);
	const { user } = useAuthContext(); // Get user from AuthContext

	const [togglingCart, setTogglingCart] = useState(false);
	const [togglingWishList, setTogglingWishList] = useState(false);

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
				fetchAllComments,
				addComment,
				removeComment,
				updateComment,
				comments,
				setComments,
				togglingCart,
				setTogglingCart,
				togglingWishList,
				setTogglingWishList,
			}}
		>
			{children}
		</UserInterractionContext.Provider>
	);
}

// Custom hook to use the UserInterractionContext
export const useUserInterractionContext = () => useContext(UserInterractionContext);
