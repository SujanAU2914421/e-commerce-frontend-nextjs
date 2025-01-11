import axios from "@/config/axios";

export const fetchWishlist = async (setWishList) => {
	try {
		const response = await axios.get("wishlist");
		setWishList(response.data);
	} catch (error) {
		console.error("Failed to fetch wishlist:", error);
	}
};

export const addToWishList = async (product_id, setWishList) => {
	try {
		await axios.post("wishlist", { product_id: product_id });
		fetchWishlist(setWishList);
	} catch (error) {
		console.error("Failed to add product to wishlist:", error);
	}
};

export const removeFromWishList = async (productId, setWishList) => {
	try {
		await axios.delete("wishlist/" + productId);
		fetchWishlist(setWishList);
	} catch (error) {
		console.error("Failed to remove product from wishlist:", error);
	}
};
