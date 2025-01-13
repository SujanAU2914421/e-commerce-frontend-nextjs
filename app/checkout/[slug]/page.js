"use client";
import { Button } from "@/components/ui/button";
import ShopNavbar from "@/components/ui/navbar";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { ChevronLeft, ChevronRight, Trash, X } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OrderInformationForm from "@/components/ui/orderInformationForm";
import { usePathname } from "next/navigation";
import CheckoutShipInformationDetail from "@/components/ui/checkoutShipInformationDetail";

export default function CartPage() {
	const pathname = usePathname();
	const currentStage = pathname.split("/")[2];

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		streetAddress: "",
		houseNumberAndStreetName: "",
		apartmentDetails: "",
		city: "",
		state: "",
		zip: "",
		phone: "",
		orderNotes: "",
	});

	const { cartItems, setCartItems } = useUserInterractionContext();

	const totalPrice = cartItems.reduce((total, item) => {
		const discount = (item.product.price * item.product.discount) / 100;
		const priceAfterDiscount = item.product.price - discount;
		return total + priceAfterDiscount * item.quantity;
	}, 0);

	return (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
			<div className="sticky left-0 top-0 z-20 bg-white" style={{ fontFamily: "outfit" }}>
				<ShopNavbar />
			</div>

			{/* Cart Content */}
			<div className="relative grid gap-8 pt-16 px-8 pb-24" style={{ fontFamily: "afacad-flux" }}>
				{/* Title */}
				<div className="relative text-5xl font-extrabold font-sans xl:px-16 lg:px-16 md:px-8 px-4 text-gray-800">
					Information
				</div>

				{/* Cart Items and Summary */}
				<div className="relative flex gap-8 xl:flex-nowrap lg:flex-nowrap flex-wrap-reverse">
					{/* Left Section: Cart Items */}
					<div className="relative h-auto w-full lg:w-3/5 xl:w-3/5 flex-col xl:px-16 lg:px-16 md:px-8 px-4 pb-16">
						<div className="relative flex items-center gap-4 text-gray-500 text-sm uppercase pb-8">
							<Link href="/cart" className="relative">
								Cart
							</Link>
							<div className="relative">
								<ChevronRight size={14} />
							</div>
							<div className="relative text-gray-800 font-bold">Information</div>
						</div>
						{currentStage === "information" ? (
							<div className="relative w-full h-auto">
								<OrderInformationForm formData={formData} setFormData={setFormData} />
							</div>
						) : currentStage === "shipping-detail" ? (
							<div className="relative w-full h-auto">
								<CheckoutShipInformationDetail formData={formData} setFormData={setFormData} />
							</div>
						) : (
							""
						)}
					</div>

					{/* Right Section: Summary */}
					{cartItems && cartItems.length > 0 ? (
						<div className="relative lg:w-2/5 xl:w-2/5 w-full h-auto">
							<div className="relative w-full bg-white p-6 border rounded-md flex flex-col">
								<div className="text-xl font-bold mb-4 uppercase font-sans">Your Order</div>{" "}
								<div className="relative w-full h-auto pb-8">
									{cartItems.map((item, index) => {
										const product = item.product;
										return (
											<div key={index} className="relative w-full flex pb-8">
												<div className="h-16 w-16 bg-gray-100 flex rounded-md border">
													<Link
														href={`/shop/${product.category.slug}/${product.id}`}
														className="relative h-full w-full rounded-md"
														style={{
															background: `url(${product.colors[0].images[0]}) center / cover`,
														}}
													>
														<div className="absolute -top-2 -right-2 h-6 w-auto p-2 rounded-full border bg-white flex items-center justify-center font-bold text-sm">
															{cartItems[index].quantity}
														</div>
													</Link>
												</div>
												<div className="relative w-[calc(100%-4rem)] px-4 flex-col gap-3">
													<Link
														href={`/shop/${product.category.slug}/${product.id}`}
														className="relative truncate text-sm text-gray-800"
													>
														{product.title}
													</Link>
													<div className="relative flex items-center gap-2">
														<div className="relative font-bold">
															{product.currency}
															{product.price * cartItems[index].quantity -
																(product.discount * product.price * cartItems[index].quantity) / 100}
														</div>
														<div className="relative line-through text-sm text-gray-500">
															{product.currency}
															{product.price * cartItems[index].quantity}
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
									<hr className="my-4" />
									<div className="flex justify-between">
										<span className="text-sm font-bold uppercase text-gray-800">Sub Total</span>
										<div className="relative font-bold text-gray-800">
											<span className="text-normal">${Math.floor(totalPrice)}</span>
											<span className="text-xs">.{(totalPrice % 1).toFixed(2).split(".")[1]}</span>
										</div>
									</div>
									<div className="flex justify-between text-sm font-medium mb-4">
										<div className="relative text-gray-800 font-bold text-sm uppercase">Shipping</div>
										<div className="relative font-bold">Free</div>
									</div>
									<div className="flex justify-between text-sm font-medium mb-2">
										<div className="relative text-gray-800 font-bold text-sm uppercase">Estimated Delivery</div>
										<div className="relative font-bold">3 days</div>
									</div>
									<hr className="my-4" />
									<div className="flex justify-between text-lg font-bold">
										<span>Total</span>
										<div className="relative font-bold text-gray-800">
											<span className="text-xl">${Math.floor(totalPrice)}</span>
											<span className="text-sm">.{(totalPrice % 1).toFixed(2).split(".")[1]}</span>
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
