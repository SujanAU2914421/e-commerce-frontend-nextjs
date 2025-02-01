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
	const [newlyAddedProducts, setNewlyAddedProducts] = useState(null);
	const [costEfficientProducts, setCostEfficientProducts] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");

	const [loadingSearchData, setLoadingSearchData] = useState(false);

	const [searchProductsResult, setSearchProductsResult] = useState(null);

	const [loadingProducts, setLoadingProducts] = useState(false);

	const [fetchProductsBy, setFetchProductsBy] = useState("latest");
	const [fetchProductBy, setFetchProductBy] = useState(null);
	const [latestItem, setLatestItem] = useState(null);

	const [currentItemData, setCurrentItemData] = useState(null);

	const [filteredProducts, setFilteredProducts] = useState(null);

	const [searchPagination, setSearchPagination] = useState(null);

	useEffect(() => {
		if (allProducts) {
			setMostSoldProducts(allProducts);
		}
	}, [allProducts]);

	const searchProducts = async (query, gender, page) => {
		setLoadingSearchData(true);
		try {
			// Make sure the base URL is configured for axios if needed
			const response = await axios.get("search-products", {
				params: {
					query: query,
					gender: gender || "", // Include gender if specified
					page: page || 1, // Handle pagination
				},
			});

			setSearchPagination(response.pagination);

			setSearchProductsResult(response.data); // Update the search result
		} catch (error) {
			console.error("Error fetching search products:", error);
		} finally {
			setLoadingSearchData(false);
		}
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
		console.log(fetchProductsBy);

		setLoadingProducts(true);
		try {
			// Find the category object matching the given name
			const matchedCategory = categories.find((cat) => cat.slug === shopCurrentCategory);

			const categoryId = matchedCategory ? matchedCategory.id : null;

			const response = await axios.post("get-products", { category: categoryId, get_by: fetchProductsBy });
			setAllProducts(response.data);

			setSearchPagination(response.pagination);

			setLoadingProducts(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getNewlyAddedProducts = async (number = 3) => {
		setLoadingProducts(true);
		try {
			const response = await axios.post("get-products", {
				category: null,
				get_by: fetchProductsBy,
				number_of_products: number,
			});
			setNewlyAddedProducts(response.data);
			setLoadingProducts(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getRelatedProducts = async (category) => {
		setLoadingProducts(true);
		try {
			const response = await axios.post("get-products", {
				category: category,
			});
			setRelatedProducts(response.data);
			setLoadingProducts(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getCostEffiecientProducts = async (number = 3) => {
		setLoadingProducts(true);
		try {
			const response = await axios.post("get-products", {
				category: null,
				get_by: "cost-efficient",
				number_of_products: number,
			});
			setCostEfficientProducts(response.data);
			setLoadingProducts(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getLatestProduct = async () => {
		try {
			const response = await axios.post("get-product", { get_by: "latest" });
			setLatestItem(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getProduct = async (productId) => {
		try {
			const response = await axios.post("get-product", { id: productId });
			setCurrentItemData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const [currentQuickViewProduct, setCurrentQuickViewProduct] = useState(null);

	const [photoView, setPhotoView] = useState(null);

	const [wishListView, setWishListView] = useState(false);
	const [carListtView, setCartListView] = useState(false);

	useEffect(() => {
		if (categories) {
			getProducts();
		}
	}, [categories]);

	useEffect(() => {
		if (fetchProductsBy) {
			getProducts();
		}
	}, [fetchProductsBy]);

	useEffect(() => {
		if (shopCurrentCategory) {
			getProducts();
		}
	}, [shopCurrentCategory]);

	useEffect(() => {
		if (
			window.location.pathname != "/auth/login" &&
			window.location.pathname != "/auth/signup" &&
			window.location.pathname != "/checkout/information" &&
			window.location.pathname != "/checkout/check"
		) {
			getCategories();
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
				loadingSearchData,
				setLoadingSearchData,
				fetchProductsBy,
				setFetchProductsBy,
				loadingProducts,
				setLoadingProducts,
				fetchProductBy,
				setFetchProductBy,
				getLatestProduct,
				latestItem,
				setLatestItem,
				newlyAddedProducts,
				setNewlyAddedProducts,
				costEfficientProducts,
				setCostEfficientProducts,
				getNewlyAddedProducts,
				getCostEffiecientProducts,
				relatedProducts,
				setRelatedProducts,
				getRelatedProducts,
				currentItemData,
				setCurrentItemData,
				getProduct,
				filteredProducts,
				setFilteredProducts,
				searchPagination,
				setSearchPagination,
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

export const useMainContext = () => useContext(MainContext);
