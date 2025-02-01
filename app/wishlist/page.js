"use client";
import { Button } from "@/components/ui/button";
import ShopNavbar from "@/components/ui/navbar";
import NumberOfItems from "@/components/ui/numberOfItems";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMainContext } from "@/contexts/MainContext";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { Trash, X } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AllWishList from "@/components/ui/allWishList";
import { removeFromCart } from "@/lib/cartsHandle";
import ExploreProducts from "@/components/ui/exploreProducts";
import Footer from "@/components/ui/footer";

export default function CartPage() {
	const { currentQuickViewProduct, setCurrentQuickViewProduct } = useMainContext();

	const { wishList, cartItems, setCartItems } = useUserInterractionContext();

	const { user } = useAuthContext();

	// State to store only products in the wishList
	const [wishListProducts, setWishListProducts] = useState([]);

	// Derive wishListProducts from wishList
	useEffect(() => {
		if (wishList && wishList.length > 0) {
			const products = wishList.map((wishlistItem) => wishlistItem.product).filter(Boolean); // Filter out any null/undefined products
			setWishListProducts(products);
		} else {
			setWishListProducts([]);
		}
	}, [wishList]);

	// Calculate total price
	const totalPrice = cartItems
		? cartItems.length < 0
			? 0
			: cartItems.reduce((total, item) => {
					const discount = (item.product.price * item.product.discount) / 100;
					const priceAfterDiscount = item.product.price - discount;
					// Add to total
					return total + priceAfterDiscount * item.quantity;
			  }, 0)
		: 0;

	return user ? (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
			<QuickViewPopUp filteredData={wishListProducts} />
			<div className="sticky left-0 top-0 z-20 bg-white" style={{ fontFamily: "outfit" }}>
				<ShopNavbar />
			</div>

			{/* Cart Content */}
			<div className="relative h-auto w-full flex xl:justify-center lg:justify-center md:justify-center pb-16">
				<div
					className="relative flex-col space-y-8 xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] pt-8 xl:px-0 lg:px-0 md:px-0 px-4 pb-8"
					style={{ fontFamily: "afacad-flux" }}
				>
					{wishList.length > 0 ? (
						<>
							<div className="relative font-bold text-xl pt-8">Your WishList Collections</div>
							<div className="relative w-full">
								<AllWishList allProducts={wishList} setCurrentQuickViewProduct={setCurrentQuickViewProduct} />
							</div>
						</>
					) : (
						<div className="relative grid gap-2">
							<div className="relative font-bold text-xl pt-8 text-gray-600">You dont have any Favorite Items</div>
							<div className="relative flex">
								<Link href={"shop"} className="relative font-bold text-xl text-gray-800 hover:underline">
									Explore Now?
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="relative">
				<Footer />
			</div>
		</div>
	) : (
		"Login to view"
	);
}
