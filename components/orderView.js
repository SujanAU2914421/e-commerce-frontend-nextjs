"use client";

import { useEffect, useState } from "react";
import { useOrderContext } from "@/contexts/OrderContext";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, Trash, X } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import NumberOfItems from "./numberOfItems";

export default function OrderView() {
	const { currentViewOrder, setCurrentViewOrder, cancelOrder, getOrder } =
		useOrderContext();

	const { user } = useAuthContext();

	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	useEffect(() => {
		console.log(currentViewOrder);
	}, [currentViewOrder]);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const orderId = urlParams.get("order_id");

		if (orderId) {
			console.log("Order ID from query:", orderId);
			getOrder(orderId);
		}
	}, []);

	// Helper functions to get color classes based on status
	const getStatusColor = (status) => {
		switch (status) {
			case "delivered":
				return "bg-green-500";
			case "approved":
				return "bg-blue-500";
			case "pending":
				return "bg-yellow-500";
			case "shipping":
				return "bg-orange-500";
			case "cancelled":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const getPaymentStatusColor = (paymentStatus) => {
		switch (paymentStatus) {
			case "paid":
				return "bg-green-500";
			case "unpaid":
				return "bg-red-500";
			case "refunded":
				return "bg-purple-500";
			default:
				return "bg-gray-500";
		}
	};

	const handleCancelOrder = (orderId) => {
		cancelOrder(orderId);
		setShowModal(false);
	};

	const confirmCancel = (orderId) => {
		setShowModal(true);
	};

	// Check if currentViewOrder has been set before rendering
	if (!currentViewOrder) {
		return (
			<div className="relative">
				<div className="text-center text-xl font-semibold text-gray-800">
					Loading order details...
				</div>
			</div>
		);
	}

	return (
		<div className="relative p-8">
			{/* Confirmation Modal */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white rounded-lg p-6 w-96">
						<h2 className="text-lg font-semibold mb-4">
							Confirm Cancellation
						</h2>
						<div className="text-gray-600 mb-6">
							Are you sure you want to cancel order #
							{currentViewOrder.id}?
						</div>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => setShowModal(false)}
								className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
							>
								No
							</button>
							<button
								onClick={() =>
									handleCancelOrder(currentViewOrder.id)
								}
								className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
							>
								Yes, Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="relative flex justify-between items-center">
				<Button onClick={() => router.back()}>
					<ChevronLeft size={16} />
					<span>Go Back</span>
				</Button>
				{currentViewOrder.status != "cancelled" &&
					currentViewOrder.status != "approved" && (
						<div className="relative flex justify-end">
							<div
								onClick={() => {
									confirmCancel(currentViewOrder.id);
								}}
								className="relative cursor-pointer py-2 flex items-center justify-center shadow px-8 rounded-md order bg-red-500 text-white"
							>
								Cancel?
							</div>
						</div>
					)}
			</div>

			<div className="space-y-8 pt-8">
				{Array.isArray(currentViewOrder.order_items) && (
					<div className="relative grid gap-2">
						<div className="relative h-auto w-auto bg-white xl:flex lg:flex md:flex hidden items-center px-4">
							<div className="relative h-auto py-4 w-full grid grid-cols-8 items-center uppercase font-bold text-sm">
								<div className="relative col-span-3 flex items-center">
									Product
								</div>
								<div className="relative col-span-1 flex items-center">
									Size
								</div>
								<div className="relative col-span-1 flex items-center">
									Color
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
						</div>
						<div className="relative grid gap-2">
							{currentViewOrder.order_items.map((item, index) => {
								const product = item.product;
								return (
									<div
										key={index}
										className="relative h-auto w-auto border bg-white rounded flex items-center px-4 hover:scale-[1.01] scale-100 duration-200"
									>
										<div className="relative h-auto py-4 w-full xl:grid lg:grid md:grid block grid-cols-8 items-center uppercase text-xs">
											<div className="relative col-span-3 flex items-center">
												<div className="relative flex items-center gap-4">
													<Link
														href={`/shop/all/${product.id}`}
													>
														<div className="relative h-auto w-auto bg-gray-100 rounded-md">
															<div
																className="h-12 w-12 rounded-md hover:scale-105 scale-100 duration-200"
																style={{
																	background: `url(${product.colors[0]?.images[0]}) center / cover`,
																}}
															>
																<div
																	className="absolute -top-1 -right-1 h-4 w-4 border-2 border-white rounded-full"
																	style={{
																		background:
																			item.color,
																	}}
																></div>
															</div>
														</div>
													</Link>
													<div className="relative grid gap-2">
														<Link
															href={`/shop/all/${product.id}`}
															className="text-sm font-medium"
														>
															<div className="relative truncate max-w-[150px]">
																{product.title}
															</div>
														</Link>
														<div className="relative xl:hidden lg:hidden md:hidden flex items-center gap-2">
															<div className="relative font-bold font-sans">
																$
																{parseFloat(
																	product.price -
																		(product.discount /
																			100) *
																			product.price
																)}
															</div>
															{product.discount >
																0 && (
																<div className="relative text-gray-700 line-through">
																	$
																	{parseFloat(
																		product.price
																	)}
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
											<div className="relative col-span-5 xl:grid-cols-5 justify-center grid-cols-5 xl:grid lg:grid md:grid flex items-center gap-2 xl:pt-0 lg:pt-0 md:pt-0 pt-4">
												<div className="relative col-span-1 flex items-center">
													{item.size}
												</div>
												<div className="relative col-span-1 flex items-center">
													{item.color}
												</div>
												<div className="relative col-span-1 xl:flex lg:flex md:flex hidden items-center gap-2 flex-wrap">
													<div className="relative font-bold font-sans">
														$
														{parseFloat(
															product.price -
																(product.discount /
																	100) *
																	product.price
														)}
													</div>
													{product.discount > 0 && (
														<div className="relative text-gray-700 line-through">
															$
															{parseFloat(
																item.price
															)}
														</div>
													)}
												</div>

												<div className="relative col-span-1 flex items-center">
													{item.quantity}
												</div>
												<div className="relative col-span-1 flex items-center gap-2 flex-wrap">
													<div className="relative font-bold font-sans">
														$
														{parseFloat(
															(item.price -
																(item.discount /
																	100) *
																	item.price) *
																item.quantity
														)}
													</div>
													{item.discount > 0 && (
														<div className="relative text-gray-700 line-through">
															$
															{parseFloat(
																item.price *
																	item.quantity
															)}
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
				<div className="relative flex gap-8 xl:flex-nowrap lg:flex-nowrap md:flex-nowrap flex-wrap *:w-1/2 *:shadow-xl">
					<div className="flex flex-col space-y-2 px-4 py-4 border rounded-md">
						{
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">
									Order Status:
								</div>
								<div
									className={`relative font-bold text-white text-xs rounded px-2 capitalize ${getStatusColor(
										currentViewOrder.status
									)}`}
								>
									{currentViewOrder.status}
								</div>
							</div>
						}
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Payment Status:</div>
							<div
								className={`relative font-bold text-white text-xs rounded px-2 capitalize ${getPaymentStatusColor(
									currentViewOrder.payment_status
								)}`}
							>
								{currentViewOrder.payment_status}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Currency:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.currency}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Shipping Cost:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.shipping_cost}
							</div>
						</div>
					</div>

					<div className="flex flex-col space-y-2 px-4 py-4 border rounded-md">
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Total Items:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_items.length}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Payment Status:</div>
							<div
								className={`relative font-bold text-white text-xs rounded px-2 capitalize ${getPaymentStatusColor(
									currentViewOrder.payment_status
								)}`}
							>
								{currentViewOrder.payment_status}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Shipping Cost:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.shipping_cost}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Total Cost:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.currency}
								{Array.isArray(currentViewOrder.order_items)
									? currentViewOrder.order_items.reduce(
											(total, item) =>
												total +
												(parseFloat(item.total_price) ||
													0),
											0
									  )
									: "0.00"}
							</div>
						</div>
					</div>
				</div>
				{/* Order Address */}
				<div className="relative h-auto w-full flex *:w-1/2 gap-8 *:shadow-xl">
					<div className="border-t pt-4 space-y-2 px-4 py-4 border rounded-md">
						<div className="font-semibold text-xl text-gray-700 pb-4">
							Order Address
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Email:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_email}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Name:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_first_name}{" "}
								{currentViewOrder.order_last_name}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Street Address:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_street_address}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">
								House Number & Street Name:
							</div>
							<div className="relative text-gray-800 font-bold">
								{
									currentViewOrder.order_house_number_and_street_name
								}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">
								Apartment Details:
							</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_apartment_details}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">City:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_city}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">State:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_state}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Zip:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_zip}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Phone:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.order_phone}
							</div>
						</div>
					</div>

					{/* Billing Address */}
					<div className="border-t pt-4 space-y-2 px-4 py-4 border rounded-md">
						<div className="font-semibold text-xl text-gray-700 pb-4">
							Billing Address
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Email:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.billing_email}
							</div>
						</div>
						{
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Name:</div>
								<div className="relative text-gray-800 font-bold">
									{currentViewOrder.billing_first_name}{" "}
									{currentViewOrder.billing_last_name}
								</div>
							</div>
						}
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Street Address:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.billing_street_address}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">
								House Number & Street Name:
							</div>
							<div className="relative text-gray-800 font-bold">
								{
									currentViewOrder.billing_house_number_and_street_name
								}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">
								Apartment Details:
							</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.billing_apartment_details}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">City:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.billing_city}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">State:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.billing_state}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Zip:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.billing_zip}
							</div>
						</div>
						<div className="relative flex items-center gap-4 flex-wrap">
							<div className="text-gray-600">Phone:</div>
							<div className="relative text-gray-800 font-bold">
								{currentViewOrder.billing_phone}
							</div>
						</div>
					</div>
				</div>
				<div className="relative h-auto w-full border rounded-md p-5 shadow-xl">
					<div className="relative flex-col space-y-4">
						<div className="relative text-xl text-gray-700 font-bold">
							Order Note
						</div>
						<div className="relative text-gray-700">
							{currentViewOrder.order_notes}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
