"use client";
import { Button } from "@/components/ui/button";
import CheckoutForm from "@/components/ui/checkoutForm";
import ExploreProducts from "@/components/ui/exploreProducts";
import ShopNavbar from "@/components/ui/navbar";
import NumberOfItems from "@/components/ui/numberOfItems";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import { useMainContext } from "@/contexts/MainContext";
import {
	ChevronLeft,
	ChevronRight,
	Trash,
	X,
} from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function CartPage() {
	const {
		cartItems,
		allProducts,
		setCartItems,
		wishList,
		setWishList,
		currentQuickViewProduct,
		setCurrentQuickViewProduct,
	} = useMainContext();

	// Calculate total price
	const totalPrice = cartItems.reduce((total, item) => {
		const product = allProducts.find((prod) => prod.id === item.productId);
		if (product) {
			// Calculate the discount price
			const discount = (product.price * product.discountPercent) / 100;
			const priceAfterDiscount = product.price - discount;
			// Add to total
			return total + priceAfterDiscount * item.quantity;
		}
		return total;
	}, 0);

	const allCartList = allProducts.filter((product) =>
		cartItems.some((cart) => cart.productId === product.id)
	);

	return (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
			<div
				className="sticky left-0 top-0 z-20 bg-white"
				style={{ fontFamily: "outfit" }}
			>
				<ShopNavbar />
			</div>

			{/* Cart Content */}
			<div
				className="relative grid gap-8 pt-8 px-8 pb-8"
				style={{ fontFamily: "afacad-flux" }}
			>
				{/* Title */}
				<div className="relative text-5xl font-extrabold font-sans xl:px-16 lg:px-16 md:px-8 px-4 text-gray-800">
					Checkout
				</div>

				{/* Cart Items and Summary */}
				<div className="relative flex gap-8 xl:flex-nowrap lg:flex-nowrap flex-wrap-reverse">
					{/* Left Section: Cart Items */}
					<div className="relative h-auto w-full lg:w-3/5 xl:w-3/5 grid gap-8 xl:px-16 lg:px-16 md:px-8 px-4 pb-16">
						<div className="relative flex items-center gap-4 text-gray-500 text-sm uppercase">
							<Link href="/cart" className="relative">
								Cart
							</Link>
							<div className="relative">
								<ChevronRight size={14} />
							</div>
							<div className="relative text-gray-800 font-bold">Check Out</div>
						</div>
						<CheckoutForm />
					</div>

					{/* Right Section: Summary */}
					{cartItems && cartItems.length > 0 ? (
						<div className="relative lg:w-2/5 xl:w-2/5 w-full h-auto">
							<div className="relative w-full bg-white p-6 border rounded-md flex flex-col">
								<div className="text-xl font-bold mb-4 uppercase font-sans">
									Your Order
								</div>{" "}
								<div className="relative w-full h-auto pb-8">
									{allCartList.map((item, index) => {
										return (
											<div key={index} className="relative w-full flex pb-8">
												<div className="h-16 w-16 bg-gray-100 flex rounded-md">
													<Link
														href={`/shop/${item.category}/${item.id}`}
														className="relative h-full w-full rounded-md"
														style={{
															background: `url(${item.images[0]}) center / cover`,
														}}
													>
														<div className="absolute -top-2 -right-2 h-6 w-auto p-2 rounded-full border bg-white flex items-center justify-center font-bold text-sm">
															{cartItems[index].quantity}
														</div>
													</Link>
												</div>
												<div className="relative w-[calc(100%-4rem)] px-4 flex-col gap-3">
													<Link
														href={`/shop/${item.category}/${item.id}`}
														className="relative truncate text-sm text-gray-800"
													>
														{item.name}
													</Link>
													<div className="relative flex items-center gap-2">
														<div className="relative font-bold">
															{item.currency}
															{item.price * cartItems[index].quantity -
																(item.discountPercent *
																	item.price *
																	cartItems[index].quantity) /
																	100}
														</div>
														<div className="relative line-through text-sm text-gray-500">
															{item.currency}
															{item.price * cartItems[index].quantity}
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
								<div className="relative flex border-t gap-4 py-8 flex-wrap">
									<div className="relative h-9 w-full">
										<input
											type="text"
											className="relative h-full w-full bg-transparent border rounded-md px-4 focus:outline-1 outline-gray-200 text-sm font-bold tracking-wider"
											placeholder="Coupon Code"
										/>
									</div>
									<div className="relative">
										<Button variant="default">Apply</Button>
									</div>
								</div>
								<div className="relative flex flex-col gap-4 border-t pt-8">
									<div className="flex justify-between text-sm font-medium mb-2">
										<div className="relative text-gray-800 font-bold text-sm uppercase">
											Subtotal
										</div>
										<div className="relative font-bold">
											${totalPrice.toFixed(2)}
										</div>
									</div>
									<div className="flex justify-between text-sm font-medium mb-4">
										<div className="relative text-gray-800 font-bold text-sm uppercase">
											Shipping
										</div>
										<div className="relative font-bold">Free</div>
									</div>
									<div className="flex justify-between text-sm font-medium mb-2">
										<div className="relative text-gray-800 font-bold text-sm uppercase">
											Estimated Delivery
										</div>
										<div className="relative font-bold">3 days</div>
									</div>
									<hr className="my-4" />
									<div className="flex justify-between text-lg font-bold">
										<div className="relative text-gray-800 font-bold text-sm uppercase">
											Total
										</div>
										<div className="relative font-bold">
											${totalPrice.toFixed(2)}
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
