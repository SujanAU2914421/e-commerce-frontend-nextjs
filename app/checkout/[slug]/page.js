"use client";
import { Button } from "@/components/ui/button";
import ShopNavbar from "@/components/navbar";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import {
	ChevronLeft,
	ChevronRight,
	Trash,
	X,
} from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OrderInformationForm from "@/components/orderInformationForm";
import { usePathname, useRouter } from "next/navigation";
import CheckoutShipInformationDetail from "@/components/checkoutShipInformationDetail";
import CheckoutPaymentPage from "@/components/orderPayment";
import { useOrderContext } from "@/contexts/OrderContext";

export default function CheckOutPage() {
	const pathname = usePathname();
	const currentStage = pathname.split("/")[2];
	const router = useRouter();

	const { cartItems, setCartItems } = useUserInterractionContext();
	const {
		orderDataInitial,
		setOrderDataInitial,
		billingAddress,
		setBillingAddress,
	} = useOrderContext();

	const totalPrice = cartItems
		? cartItems.length < 0
			? 0
			: cartItems.reduce((total, item) => {
					const discount =
						(item.product.price * item.product.discount) / 100;
					const priceAfterDiscount = item.product.price - discount;
					return total + priceAfterDiscount * item.quantity;
			  }, 0)
		: 0;

	const handleGoBack = () => {
		router.back();
	};

	useEffect(() => {
		console.log(cartItems);
	}, [cartItems]);

	if (cartItems && cartItems.length > 0) {
		return (
			<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
				<div
					className="sticky left-0 top-0 z-20 bg-white"
					style={{ fontFamily: "outfit" }}
				>
					<ShopNavbar />
				</div>
				{/* Cart Content */}
				<div className="relative h-auto w-full flex justify-center">
					<div
						className="relative grid gap-8 pt-16  xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] xl:px-0 lg:px-0 md:px-0 px-4 pb-24"
						style={{ fontFamily: "afacad-flux" }}
					>
						{/* Title */}
						<div className="relative text-5xl font-extrabold font-sans text-gray-800">
							{currentStage === "information" ? (
								<div className="relative w-full h-auto">
									Information
								</div>
							) : currentStage === "shipping-detail" ? (
								<div className="relative w-full h-auto">
									Order Destination Detail
								</div>
							) : currentStage === "payment" ? (
								<div className="relative w-full h-auto">
									Payment Details
								</div>
							) : (
								""
							)}
						</div>

						{/* Cart Items and Summary */}
						<div className="relative flex gap-8 xl:flex-nowrap lg:flex-nowrap flex-wrap-reverse">
							{/* Left Section: Cart Items */}
							<div className="relative h-auto w-full lg:w-3/5 xl:w-3/5 flex-col pb-16">
								<div className="relative flex items-center gap-4 text-gray-500 text-sm uppercase pb-8">
									<div className="relative mr-5">
										<Button
											className="bg-gray-600"
											onClick={handleGoBack}
										>
											<ChevronLeft size={14} />
											Go Back
										</Button>
									</div>
									<div
										className={`relative text-gray-800 ${
											currentStage === "cart"
												? "font-bold"
												: "font-normal text-xs"
										}`}
									>
										Cart
									</div>
									<div className="relative">
										<ChevronRight size={14} />
									</div>
									<div
										className={`relative text-gray-800 ${
											currentStage === "information"
												? "font-bold"
												: "font-normal text-xs"
										}`}
									>
										Information
									</div>
									<div className="relative">
										<ChevronRight size={14} />
									</div>
									<div
										className={`relative text-gray-800 ${
											currentStage === "shipping-detail"
												? "font-bold"
												: "font-normal text-xs"
										}`}
									>
										Review
									</div>
									<div className="relative">
										<ChevronRight size={14} />
									</div>
									<div
										className={`relative text-gray-800 ${
											currentStage === "payment"
												? "font-bold"
												: "font-normal text-xs"
										}`}
									>
										Payment Detail
									</div>
								</div>
								{currentStage === "information" ? (
									<div className="relative w-full h-auto">
										<OrderInformationForm />
									</div>
								) : currentStage === "shipping-detail" ? (
									<div className="relative w-full h-auto">
										<CheckoutShipInformationDetail />
									</div>
								) : currentStage === "payment" ? (
									<div className="relative w-full h-auto">
										<CheckoutPaymentPage />
									</div>
								) : (
									""
								)}
							</div>

							{/* Right Section: Summary */}
							{cartItems && cartItems.length > 0 ? (
								<div className="relative lg:w-2/5 xl:w-2/5 w-full h-auto">
									<div className="relative w-full bg-white p-8 border rounded-md flex flex-col">
										<div className="text-xl font-bold mb-6 uppercase font-sans">
											Your Order
										</div>{" "}
										<div className="relative w-full h-auto pb-8">
											{cartItems.map((item, index) => {
												const product = item.product;
												return (
													<div
														key={index}
														className="relative w-full flex pb-8"
													>
														<div className="h-16 w-16 bg-gray-100 flex rounded-md border">
															<Link
																href={`/shop/${product.category.slug}/${product.id}`}
																className="relative h-full w-full rounded-md"
																style={{
																	background: `url(${product.colors[0].images[0]}) center / cover`,
																}}
															>
																<div className="absolute -top-2 -right-2 h-6 w-auto p-2 rounded-full border bg-white flex items-center justify-center font-bold text-sm">
																	{
																		cartItems[
																			index
																		]
																			.quantity
																	}
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
																	{
																		product.currency
																	}
																	{product.price *
																		cartItems[
																			index
																		]
																			.quantity -
																		(product.discount *
																			product.price *
																			cartItems[
																				index
																			]
																				.quantity) /
																			100}
																</div>
																<div className="relative line-through text-sm text-gray-500">
																	{
																		product.currency
																	}
																	{product.price *
																		cartItems[
																			index
																		]
																			.quantity}
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
												<Button variant="default">
													Apply
												</Button>
											</div>
										</div>
										<div className="relative flex flex-col gap-4 pt-8">
											<hr className="my-4" />
											<div className="flex justify-between">
												<span className="text-sm font-bold uppercase text-gray-800">
													Sub Total
												</span>
												<div className="relative font-bold text-gray-800">
													<span className="text-normal">
														$
														{Math.floor(totalPrice)}
													</span>
													<span className="text-xs">
														.
														{
															(totalPrice % 1)
																.toFixed(2)
																.split(".")[1]
														}
													</span>
												</div>
											</div>
											<div className="flex justify-between text-sm font-medium mb-4">
												<div className="relative text-gray-800 font-bold text-sm uppercase">
													Shipping
												</div>
												<div className="relative font-bold">
													Free
												</div>
											</div>
											<div className="flex justify-between text-sm font-medium mb-2">
												<div className="relative text-gray-800 font-bold text-sm uppercase">
													Estimated Delivery
												</div>
												<div className="relative font-bold">
													3 days
												</div>
											</div>
											<hr className="my-4" />
											<div className="flex justify-between text-lg font-bold">
												<span>Total</span>
												<div className="relative font-bold text-gray-800">
													<span className="text-xl">
														$
														{Math.floor(totalPrice)}
													</span>
													<span className="text-sm">
														.
														{
															(totalPrice % 1)
																.toFixed(2)
																.split(".")[1]
														}
													</span>
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
			</div>
		);
	} else {
		window.location.href = "/cart";
	}
}
