"use client";
import axios from "@/config/axios";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

const MainContext = createContext();

export function MainContextProvider({ children }) {
	const [shopCurrentCategory, setShopCurrentCategory] = useState(null);
	const [categories, setCategories] = useState(null);

	const [allProducts, setAllProducts] = useState(null);

	const mostSoldProducts = allProducts;

	const getCategories = async () => {
		try {
			const response = await axios.get("categories");
			setCategories(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProducts = async () => {
		try {
			const response = await axios.get("products");
			setAllProducts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const [currentQuickViewProduct, setCurrentQuickViewProduct] = useState(null);

	const [photoView, setPhotoView] = useState(null);

	const [wishListView, setWishListView] = useState(false);
	const [carListtView, setCartListView] = useState(false);

	useEffect(() => {
		getCategories();
		getProducts();
	}, []);

	return (
		<MainContext.Provider
			value={{
				categories,
				shopCurrentCategory,
				setShopCurrentCategory,
				allProducts,
				currentQuickViewProduct,
				setCurrentQuickViewProduct,
				photoView,
				setPhotoView,
				mostSoldProducts,
				wishListView,
				setWishListView,
				carListtView,
				setCartListView,
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

export const useMainContext = () => useContext(MainContext);
