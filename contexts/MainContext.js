"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
	const [shopCurrentCategory, setShopCurrentCategory] = useState(null);
	const categories = [
		{ name: "T-Shirts", icon: "https://example.com/icons/tshirts.png" },
		{ name: "Hoodies", icon: "https://example.com/icons/hoodies.png" },
		{ name: "Sweat-shirts", icon: "https://example.com/icons/sweatshirts.png" },
		{ name: "Jeans", icon: "https://example.com/icons/jeans.png" },
		{ name: "Jackets", icon: "https://example.com/icons/jackets.png" },
		{ name: "Track-suits", icon: "https://example.com/icons/tracksuits.png" },
		{ name: "Active-wear", icon: "https://example.com/icons/activewear.png" },
		{ name: "Shorts", icon: "https://example.com/icons/shorts.png" },
		{ name: "Cargo Pants", icon: "https://example.com/icons/cargo_pants.png" },
		{ name: "Sweaters", icon: "https://example.com/icons/sweaters.png" },
		{
			name: "Wind-breakers",
			icon: "https://example.com/icons/windbreakers.png",
		},
		{ name: "Vests", icon: "https://example.com/icons/vests.png" },
		{ name: "Swimwear", icon: "https://example.com/icons/swimwear.png" },
		{ name: "Overalls", icon: "https://example.com/icons/overalls.png" },
		{ name: "Raincoats", icon: "https://example.com/icons/raincoats.png" },
		{ name: "Beanies", icon: "https://example.com/icons/beanies.png" },
		{ name: "Scarves", icon: "https://example.com/icons/scarves.png" },
		{ name: "Socks", icon: "https://example.com/icons/socks.png" },
		{ name: "Belts", icon: "https://example.com/icons/belts.png" },
		{ name: "Caps", icon: "https://example.com/icons/caps.png" },
	];

	const allProducts = [
		{
			id: "0x1A2B3C",
			name: "Everyday Essential Tee",
			price: 15,
			discountPercent: 10,
			currency: "$",
			rating: 3.5,
			available: true,
			stock: 4,
			sales: 500,
			description:
				"A timeless classic, this white T-shirt is made from 100% cotton for ultimate comfort. Perfect for casual wear or layering.",
			images: [
				"/assets/photos/products/t-shirt/black/image1.webp",
				"https://via.placeholder.com/300x200?text=White+T-Shirt+Hover",
			],
			category: "T-Shirts",
			reviews: [
				{
					username: "cozylover",
					rating: 5,
					comment:
						"Absolutely love this hoodie! It's warm and the material is high-quality.",
					date: new Date("2024-12-15T16:45:00Z").getTime(),
				},
				{
					username: "stylequeen",
					rating: 4,
					comment: "Looks great but runs a bit small. Order one size up!",
					date: new Date("2024-11-30T12:20:00Z").getTime(),
				},
			],
			sizes: ["S", "M", "L", "XL"],
			colors: [
				{
					name: "White",
					images: [
						"/assets/photos/products/t-shirt/white/image1.webp",
						"/assets/photos/products/t-shirt/white/image2.webp",
						"/assets/photos/products/t-shirt/white/image3.webp",
						"/assets/photos/products/t-shirt/white/image4.webp",
					],
				},
				{
					name: "Black",
					images: [
						"/assets/photos/products/t-shirt/black/image1.webp",
						"/assets/photos/products/t-shirt/black/image2.webp",
						"/assets/photos/products/t-shirt/black/image3.webp",
						"/assets/photos/products/t-shirt/black/image4.webp",
						"/assets/photos/products/t-shirt/black/image5.webp",
					],
				},
				{
					name: "green",
					images: [
						"/assets/photos/products/t-shirt/green/image1.webp",
						"/assets/photos/products/t-shirt/green/image2.webp",
						"/assets/photos/products/t-shirt/green/image3.webp",
						"/assets/photos/products/t-shirt/green/image4.webp",
						"/assets/photos/products/t-shirt/green/image5.webp",
					],
				},
			],
			addedDate: new Date("2024-11-01T10:00:00Z").getTime(),
		},
		{
			id: "0x2B3C4D",
			name: "Urban Comfort Sweatpants",
			price: 40,
			discountPercent: 15,
			currency: "$",
			rating: 4.8,
			available: true,
			stock: 150,
			sales: 400,
			description:
				"Stay warm and stylish with this cozy grey hoodie, featuring a soft fleece lining and adjustable drawstring.",
			images: [
				"/assets/photos/products/sweatpants/white/image1.webp",
				"https://via.placeholder.com/300x200?text=Grey+Hoodie+Hover",
			],
			category: "Hoodies",
			reviews: [
				{
					username: "fashionista101",
					rating: 5,
					picture: "/assets/photos/avatar/user1.png",
					comment:
						"This jacket is a must-have! It’s so versatile and comfortable. Absolutely love it!",
				},
				{
					username: "style_guru",
					rating: 4,
					picture: "/assets/photos/avatar/user2.png",
					comment:
						"Great quality denim and fits true to size. I wish there were more color options.",
				},
				{
					username: "trendsetter",
					rating: 5,
					picture: "/assets/photos/avatar/user3.png",
					comment:
						"Amazing jacket! Perfect for casual outings. I’ve been getting so many compliments.",
				},
				{
					username: "casual_dresser",
					rating: 4.5,
					picture: "/assets/photos/avatar/user4.png",
					comment:
						"Stylish and comfortable! Great for layering over hoodies or tees.",
				},
			],
			sizes: ["M", "L", "XL"],
			colors: [
				{
					name: "white",
					images: [
						"/assets/photos/products/sweatpants/white/image1.webp",
						"/assets/photos/products/sweatpants/white/image2.webp",
						"/assets/photos/products/sweatpants/white/image3.webp",
						"/assets/photos/products/sweatpants/white/image4.webp",
						"/assets/photos/products/sweatpants/white/image5.webp",
					],
				},
				{
					name: "pink",
					images: [
						"/assets/photos/products/sweatpants/pink/image1.webp",
						"/assets/photos/products/sweatpants/pink/image2.webp",
						"/assets/photos/products/sweatpants/pink/image3.webp",
					],
				},
				{
					name: "black",
					images: [
						"/assets/photos/products/sweatpants/black/image1.webp",
						"/assets/photos/products/sweatpants/black/image2.webp",
						"/assets/photos/products/sweatpants/black/image3.webp",
						"/assets/photos/products/sweatpants/black/image4.webp",
						"/assets/photos/products/sweatpants/black/image5.webp",
					],
				},
			],
			addedDate: new Date("2024-12-01T14:30:00Z").getTime(),
		},
	];

	const [cartItems, setCartItems] = useState([
		{
			productId: "0x1A2B3C", // Matches the ID from allProducts
			quantity: 2, // Quantity user wants to buy
		},
		{
			productId: "0x2B3C4D", // Matches the ID from allProducts
			quantity: 3, // Quantity user wants to buy
		},
	]);

	const [mostSoldProducts, setMostSoldProducts] = useState([
		{
			productId: "0x1A2B3C", // Matches the ID from allProducts
			quantity: 2, // Quantity user wants to buy
		},
		{
			productId: "0x2B3C4D", // Matches the ID from allProducts
			quantity: 3, // Quantity user wants to buy
		},
	]);

	const [wishList, setWishList] = useState([
		{
			productId: "0x1A2B3C", // Matches the ID from allProducts
		},
		{
			productId: "0x2B3C4D", // Matches the ID from allProducts
		},
	]);
	const [currentQuickViewProduct, setCurrentQuickViewProduct] = useState(null);

	const [photoView, setPhotoView] = useState(null);

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
				cartItems,
				setCartItems,
				wishList,
				setWishList,
				mostSoldProducts,
				setMostSoldProducts,
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

export const useMainContext = () => useContext(MainContext);
