"use client";

import React, { useEffect, useState } from "react";
import { useOrderContext } from "@/contexts/OrderContext";
import OrderView from "@/components/ui/orderView";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function OrdersUiPage() {
	const { getAllOrder, orderData, cancelOrder } = useOrderContext();

	const { user } = useAuthContext();

	const [selectedOrderId, setSelectedOrderId] = useState(null);

	const pathname = usePathname();
	const [orderIdFromQuery, setOrderIdFromQuery] = useState(null);

	// Helper functions to get color classes based on status
	const getStatusColor = (status) => {
		switch (status) {
			case "delivered":
				return "text-green-500";
			case "approved":
				return "text-blue-500";
			case "pending":
				return "text-yellow-500";
			case "shipping":
				return "text-orange-500";
			case "cancelled":
				return "text-red-500";
			default:
				return "text-gray-500";
		}
	};

	const getPaymentStatusColor = (paymentStatus) => {
		switch (paymentStatus) {
			case "paid":
				return "text-green-500";
			case "unpaid":
				return "text-red-500";
			case "refunded":
				return "text-purple-500";
			default:
				return "text-gray-500";
		}
	};

	useEffect(() => {
		// Extract query parameters from URL using URLSearchParams
		const urlParams = new URLSearchParams(window.location.search);
		const orderId = urlParams.get("order_id");

		if (orderId) {
			setOrderIdFromQuery(orderId); // Store order_id in state
		}

		// Fetch all orders when the component mounts
		getAllOrder();
	}, []);

	useEffect(() => {
		console.log(orderData);
	}, [orderData]);

	const handleOrderClick = (orderId) => {
		// Redirect to the order details page with the order_id in query
		window.location.search = `?order_id=${orderId}`;
	};

	return (
		<div className="relative h-auto w-full px-8 py-8">
			{orderIdFromQuery ? (
				// If the query contains an order_id, render the OrderView component
				<OrderView />
			) : (
				// Otherwise, render the list of orders
				<>
					{orderData && orderData.length > 0 ? (
						<div className="grid grid-cols-1 gap-6">
							{orderData.map((order, index) => {
								let total_price = 0;

								return (
									<div
										key={index}
										onClick={() => handleOrderClick(order.id)}
										className="relative h-auto w-full shadow-xl border rounded-md p-5"
									>
										<div className="relative h-auto w-full space-y-2">
											{/* Order ID */}
											<div className="relative text-lg font-bold">Order #{order.id}</div>

											{/* Order Date */}
											<div className="text-sm text-gray-500">
												Placed on: {new Date(order.created_at).toLocaleDateString()}
											</div>

											{/* Order Status */}
											<div
												className={`text-sm font-medium ${
													order.status === "Delivered" ? "text-green-600" : "text-orange-600"
												}`}
											>
												Status: {order.status}
											</div>

											{/* Product List */}
											<div className="text-sm text-gray-700">
												Products:
												<ul className="list-disc ml-4">
													{order.order_items.map((product, productIndex) => {
														total_price += parseFloat(product.total_price);
														return (
															<li key={productIndex}>
																{product.product.title} - {product.quantity} x ${parseFloat(product.product.price)}
															</li>
														);
													})}
												</ul>
											</div>

											{/* Total Amount */}
											<div className="font-semibold text-gray-800">Total: ${total_price}</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="text-center text-gray-500">You don’t have any orders.</div>
					)}
				</>
			)}
		</div>
	);
}
