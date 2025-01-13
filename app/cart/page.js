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
	const totalPrice =
		cartItems.length < 0
			? 0
			: cartItems.reduce((total, item) => {
					const discount = (item.product.price * item.product.discount) / 100;
					const priceAfterDiscount = item.product.price - discount;
					// Add to total
					return total + priceAfterDiscount * item.quantity;
			  }, 0);

	return user ? (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
			{/* Navbar */}
			{
				// If quickViewPopUp is true, render the QuickViewPopUp component
				currentQuickViewProduct != null && currentQuickViewProduct != [] && (
					<QuickViewPopUp
						filteredData={wishListProducts}
						currentQuickViewProduct={currentQuickViewProduct}
						setCurrentQuickViewProduct={setCurrentQuickViewProduct}
					/>
				)
			}
			<div className="sticky left-0 top-0 z-20 bg-white" style={{ fontFamily: "outfit" }}>
				<ShopNavbar />
			</div>

			{/* Cart Content */}
			<div className="relative grid gap-8 pt-8 xl:px-8 lg:px-8 md:px-8 px-4 pb-8" style={{ fontFamily: "afacad-flux" }}>
				{/* Title */}
				<div className="relative text-5xl font-extrabold font-sans">Your Cart</div>

				{/* Cart Items and Summary */}
				<div className="relative gap-8 grid xl:grid-cols-5 lg:grid-cols-5">
					{/* Left Section: Cart Items */}
					<div className="relative h-auto w-full lg:col-span-3 xl:col-span-3 pb-16">
						{/* Check if cart is empty */}
						{cartItems.length === 0 ? (
							<div className="relative text-center text-lg font-medium text-gray-500">Your cart is empty.</div>
						) : (
							<div className="relative grid gap-2">
								{/* Table Header */}
								<div className="relative h-auto w-auto bg-white xl:flex lg:flex md:flex hidden items-center px-4">
									<div className="relative h-auto py-4 w-full grid grid-cols-6 items-center uppercase font-bold text-sm">
										<div className="relative col-span-3 flex items-center">Product</div>
										<div className="relative col-span-1 flex items-center">Price</div>
										<div className="relative col-span-1 flex items-center">Quantity</div>
										<div className="relative col-span-1 flex items-center">Sub Total</div>
									</div>
									<div className="relative h-10 w-10 flex items-center justify-center">
										<Trash size={16} />
									</div>
								</div>
								<div className="relative grid gap-2">
									{cartItems.map((item, index) => {
										const product = item.product;
										return (
											<div
												key={index}
												className="relative h-auto w-auto border bg-white rounded flex items-center px-4 hover:scale-[1.01] scale-100 duration-200"
											>
												<div className="relative h-auto py-4 w-full xl:grid lg:grid md:grid block grid-cols-6 items-center uppercase text-xs">
													<div className="relative col-span-3 flex items-center">
														<div className="relative flex items-center gap-4">
															<Link href={`/shop/${product.category.slug}/${product.id}`}>
																<div
																	className="h-12 w-12 rounded-md hover:scale-105 scale-100 duration-200"
																	style={{
																		background: `url(${product.colors[0]?.images[0]}) center / cover`,
																	}}
																></div>
															</Link>
															<div className="relative grid gap-2">
																<Link
																	href={`/shop/${product.category.slug}/${product.id}`}
																	className="text-sm font-medium"
																>
																	{product.name}
																</Link>
																<div className="relative xl:hidden lg:hidden md:hidden flex items-center gap-2">
																	<div className="relative font-bold font-sans">
																		${product.price - (product.discount / 100) * product.price}
																	</div>
																	<div className="relative text-gray-700 line-through">${product.price}</div>
																</div>
															</div>
														</div>
													</div>
													<div className="relative col-span-3 xl:grid-cols-3 justify-center grid-cols-3 xl:grid lg:grid md:grid flex items-center gap-2 xl:pt-0 lg:pt-0 md:pt-0 pt-4">
														<div className="relative col-span-1 xl:flex lg:flex md:flex hidden items-center gap-2 flex-wrap">
															<div className="relative font-bold font-sans">
																${product.price - (product.discount / 100) * product.price}
															</div>
															<div className="relative text-gray-700 line-through">${product.price}</div>
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
														<div className="relative col-span-1 flex items-center gap-2 flex-wrap">
															<div className="relative font-bold font-sans">
																${(product.price - (product.discount / 100) * product.price) * item.quantity}
															</div>
															<div className="relative text-gray-700 line-through">
																${product.price * item.quantity}
															</div>
														</div>
													</div>
												</div>
												<div
													onClick={() => {
														removeFromCart(product.id, setCartItems);
													}}
													className="relative cursor-pointer h-10 w-10 hover:bg-gray-200 rounded-md flex items-center justify-center"
												>
													<X size={14} />
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
						<div className="relative w-full h-auto pt-16">
							<div className="relative w-full grid gap-6">
								<div className="relative xl:hidden lg:hidden flex w-full h-auto">
									<div className="relative h-auto w-full bg-white p-6 border rounded">
										<div className="text-xl font-bold text-gray-800 mb-4 uppercase font-sans">Cart Totals</div>
										<div className="flex justify-between text-sm font-medium mb-2">
											<span>Subtotal</span>
											<span>${totalPrice}</span>
										</div>
										<div className="flex justify-between text-sm font-medium mb-4">
											<span>Shipping</span>
											<span>Free</span>
										</div>
										<hr className="my-4" />
										<div className="flex justify-between text-lg font-bold">
											<span>Total</span>
											<div className="relative font-bold text-gray-800">
												<span className="text-xl">${Math.floor(totalPrice)}</span>
												<span className="text-sm">.{(totalPrice % 1).toFixed(2).split(".")[1]}</span>
											</div>
										</div>
										<Link
											href={"/checkout"}
											className="mt-6 h-10 cursor-pointer flex items-center justify-center w-full bg-black text-white rounded-md text-sm font-bold hover:bg-gray-800 transition"
											disabled={cartItems.length === 0}
										>
											Proceed to Checkout
										</Link>
									</div>
								</div>
								{wishList.length > 0 ? (
									<>
										<div className="relative font-bold text-xl pt-8">Some Of Your Favorite Products</div>
										<div className="relative w-full">
											<AllWishList
												allProducts={wishList.filter(
													(product) => !cartItems.some((cartItem) => cartItem.product_id === product.product_id)
												)}
												setCurrentQuickViewProduct={setCurrentQuickViewProduct}
											/>
										</div>
									</>
								) : (
									<div className="relative grid gap-2">
										<div className="relative font-bold text-xl pt-8 text-gray-600">
											You dont have any Favorite Items
										</div>
										<div className="relative flex">
											<Link href={"shop"} className="relative font-bold text-xl text-gray-800 hover:underline">
												Explore Now?
											</Link>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Right Section: Summary */}
					{cartItems && cartItems.length > 0 ? (
						<div className="relative w-full lg:col-span-2 xl:col-span-2 xl:flex lg:flex hidden h-full">
							<div className="relative w-full">
								<div className="xl:sticky lg:sticky relative xl:top-20 lg:top-20 w-full bg-white p-6 border rounded">
									<div className="text-xl font-bold text-gray-800 mb-4 uppercase font-sans">Cart Totals</div>
									<div className="flex justify-between text-sm font-medium mb-2">
										<span>Subtotal</span>
										<span>${totalPrice}</span>
									</div>
									<div className="flex justify-between text-sm font-medium mb-4">
										<span>Shipping</span>
										<span>Free</span>
									</div>
									<hr className="my-4" />
									<div className="flex justify-between text-lg font-bold">
										<span>Total</span>
										<div className="relative font-bold text-gray-800">
											<span className="text-xl">${Math.floor(totalPrice)}</span>
											<span className="text-sm">.{(totalPrice % 1).toFixed(2).split(".")[1]}</span>
										</div>
									</div>
									<div className="relative w-full flex mt-6 justify-center font-sans">
										<Link href={"/checkout"} disabled={cartItems.length === 0}>
											<Button>Proceed to Checkout</Button>
										</Link>
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
	) : (
		"Login to view"
	);
}
