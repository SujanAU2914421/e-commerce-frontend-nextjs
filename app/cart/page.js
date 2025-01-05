"use client";
import ExploreProducts from "@/components/ui/exploreProducts";
import ShopNavbar from "@/components/ui/navbar";
import NumberOfItems from "@/components/ui/numberOfItems";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import { useMainContext } from "@/contexts/MainContext";
import { Trash, X } from "lucide-react/dist/cjs/lucide-react";
import React from "react";

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
			return total + product.price * item.quantity;
		}
		return total;
	}, 0);

	const allWishList = allProducts.filter((product) =>
		wishList.some((wish) => wish.productId === product.id)
	);
	return (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto bg-gray-100">
			{/* Navbar */}
			{
				// If quickViewPopUp is true, render the QuickViewPopUp component
				currentQuickViewProduct != null && currentQuickViewProduct != [] && (
					<QuickViewPopUp
						filteredData={allWishList}
						currentQuickViewProduct={currentQuickViewProduct}
						setCurrentQuickViewProduct={setCurrentQuickViewProduct}
					/>
				)
			}
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
				<div className="relative text-3xl font-extrabold font-sans">Cart</div>

				{/* Cart Items and Summary */}
				<div className="relative flex gap-8">
					{/* Left Section: Cart Items */}
					<div className="relative h-auto w-full lg:w-3/5 xl:w-3/5">
						{/* Check if cart is empty */}
						{cartItems.length === 0 ? (
							<div className="relative text-center text-lg font-medium text-gray-500">
								Your cart is empty.
							</div>
						) : (
							<div className="relative grid gap-8">
								{/* Table Header */}
								<div className="relative h-auto w-auto border bg-white flex items-center px-4">
									<div className="relative h-auto py-4 w-full grid grid-cols-6 items-center uppercase text-sm">
										<div className="relative col-span-3 flex items-center">
											Product
										</div>
										<div className="relative col-span-1 flex items-center">
											Price
										</div>
										<div className="relative col-span-1 flex items-center">
											Quantity
										</div>
										<div className="relative col-span-1 flex items-center">
											Sub Total
										</div>
									</div>
									<div className="relative h-10 w-10 flex items-center justify-center">
										<Trash size={16} />
									</div>
								</div>
								<div className="relative grid gap-4">
									{/* Map through cart items */}
									{cartItems.map((item, index) => {
										const product = allProducts.find(
											(prod) => prod.id === item.productId
										);
										if (!product) return null;

										return (
											<div
												key={index}
												className="relative h-auto w-auto border bg-white flex items-center px-4"
											>
												<div className="relative h-auto py-4 w-full grid grid-cols-6 items-center uppercase text-xs">
													<div className="relative col-span-3 flex items-center">
														<div className="relative flex items-center gap-4">
															<img
																src={product.images[0]}
																alt={product.name}
																className="h-12 w-12 object-cover rounded-md"
															/>
															<span className="text-sm font-medium">
																{product.name}
															</span>
														</div>
													</div>
													<div className="relative col-span-1 flex items-center gap-2">
														<div className="relative font-bold font-sans">
															$
															{product.price.toFixed(2) -
																(product.discountPercent / 100) * product.price}
														</div>
														<div className="relative text-gray-700 line-through">
															${product.price.toFixed(2)}
														</div>
													</div>
													<div className="relative col-span-1 flex items-center">
														{/* Pass quantity and available stock */}
														<NumberOfItems
															cartItems={cartItems}
															currentItem={item}
															setCartItems={setCartItems}
															stock={product.stock}
														/>
													</div>
													<div className="relative col-span-1 flex items-center gap-2">
														<div className="relative font-bold font-sans">
															$
															{(
																(product.price.toFixed(2) -
																	(product.discountPercent / 100) *
																		product.price) *
																item.quantity
															).toFixed(2)}
														</div>
														<div className="relative text-gray-700 line-through">
															${(product.price * item.quantity).toFixed(2)}
														</div>
													</div>
												</div>
												<div className="relative h-10 w-10 flex items-center justify-center">
													<X size={14} />
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
						<div className="relative w-full h-auto pt-8">
							<div className="relative w-full grid gap-6">
								<div className="relative font-bold">
									Some Of Your Favorite Products
								</div>
								<div className="relative w-full">
									<ExploreProducts
										allProducts={allWishList}
										setCurrentQuickViewProduct={setCurrentQuickViewProduct}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Right Section: Summary */}
					{cartItems && cartItems.length > 0 ? (
						<div className="relative w-full lg:w-2/5 xl:w-2/5 h-auto">
							<div className="sticky top-16 w-full bg-white p-6 border">
								<h3 className="text-xl font-bold mb-4 uppercase font-sans">
									Cart Totals
								</h3>
								<div className="flex justify-between text-sm font-medium mb-2">
									<span>Subtotal</span>
									<span>${totalPrice.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm font-medium mb-4">
									<span>Shipping</span>
									<span>Free</span>
								</div>
								<hr className="my-4" />
								<div className="flex justify-between text-lg font-bold">
									<span>Total</span>
									<span>${totalPrice.toFixed(2)}</span>
								</div>
								<div
									className="mt-6 h-10 cursor-pointer flex items-center justify-center w-full bg-black text-white rounded-md text-sm font-bold hover:bg-gray-800 transition"
									disabled={cartItems.length === 0}
								>
									Proceed to Checkout
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
