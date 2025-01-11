import axios from "@/config/axios";

export const fetchAllCart = async (setCartItems) => {
	try {
		const response = await axios.get("carts");
		setCartItems(response.data);
	} catch (error) {
		console.log(error);
	}
};

export const addToCart = async (product_id, setCartItems, quantity = 1) => {
	try {
		await axios.post("carts", { product_id: product_id, quantity: quantity, color: "black", size: "M" });
		fetchAllCart(setCartItems);
	} catch (error) {
		console.error("Failed to add product to carts:", error);
	}
};

export const removeFromCart = async (product_id, setCartItems) => {
	try {
		await axios.delete("carts/" + product_id);
		fetchAllCart(setCartItems);
	} catch (error) {
		console.error("Failed to remove product from carts:", error);
	}
};
