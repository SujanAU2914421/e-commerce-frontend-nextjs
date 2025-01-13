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

	const [mostSoldProducts, setMostSoldProducts] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");

	const [searchProductsResult, setSearchProductsResult] = useState(null);

	useEffect(() => {
		if (allProducts) {
			setMostSoldProducts(allProducts);
		}
	}, [allProducts]);

	const searchProducts = async (query) => {
		try {
			// Make sure the full URL is passed if you're calling the Laravel API directly
			const response = await axios.get("search-products", {
				params: { query: query }, // Pass 'query' as a query parameter
			});
			setSearchProductsResult(response.data); // Update the search result
		} catch (error) {}
	};

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
		if (
			window.location.pathname != "/auth/login" &&
			window.location.pathname != "/auth/signup" &&
			window.location.pathname != "/checkout/information" &&
			window.location.pathname != "/checkout/check"
		) {
			getCategories();
			getProducts();
		}
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
				searchQuery,
				setSearchQuery,
				searchProducts,
				searchProductsResult,
				getCategories,
				getProducts,
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

export const useMainContext = () => useContext(MainContext);
