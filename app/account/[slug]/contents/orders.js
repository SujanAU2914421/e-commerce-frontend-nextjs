"use client";

import React, { useEffect, useState } from "react";
import { useOrderContext } from "@/contexts/OrderContext";
import OrderView from "@/components/ui/orderView";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function OrdersUiPage() {
	const { getAllOrder, orderData, cancelOrder } = useOrderContext();
	const [showModal, setShowModal] = useState(false);

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

	const handleCancelOrder = (orderId) => {
		cancelOrder(orderId);
		setShowModal(false);
	};

	const confirmCancel = (orderId) => {
		setSelectedOrderId(orderId);
		setShowModal(true);
	};

	const handleOrderClick = (orderId) => {
		// Redirect to the order details page with the order_id in query
		window.location.search = `?order_id=${orderId}`;
	};

	return (
		<div className="relative h-auto w-full px-8 py-8">
			<h1 className="font-bold text-3xl mb-6">Your Orders</h1>

			{orderIdFromQuery ? (
				// If the query contains an order_id, render the OrderView component
				<OrderView />
			) : (
				// Otherwise, render the list of orders
				<>
					{orderData && orderData.length > 0 ? (
						<div className="grid grid-cols-1 gap-6">
							{orderData.map((order) => (
								<div key={order.id} className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
									<div className="font-semibold text-lg mb-2 cursor-pointer" onClick={() => handleOrderClick(order.id)}>
										Order #{order.id}
									</div>
									<div className="relative mb-2 flex items-center gap-2">
										<div className={`font-semibold`}>Status:</div>
										<div className={`font-semibold ${getStatusColor(order.status)}`}>{order.status}</div>
									</div>
									<div className="relative mb-2 flex items-center gap-2">
										<div className={`font-semibold`}>Payment Status:</div>
										<div className={`font-semibold ${getPaymentStatusColor(order.payment_status)}`}>
											{order.payment_status}
										</div>
									</div>
									<div className="text-gray-600 mb-2">
										Total Price: {order.currency}
										{order.order_items.reduce((total, item) => total + parseFloat(item.total_price || 0), 0).toFixed(2)}
									</div>
									<div className="text-gray-700 font-semibold">Items:</div>
									<ul className="list-disc ml-6 mb-4">
										{order.order_items.map((item, index) => (
											<li key={index} className="text-gray-600">
												{item.quantity} x {item.product.title} - {item.color} ({item.size})
											</li>
										))}
									</ul>
									{order.status !== "cancelled" && order.status !== "delivered" && (
										<button
											onClick={() => confirmCancel(order.id)}
											className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
										>
											Cancel Order
										</button>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="text-center text-gray-500">You don’t have any orders.</div>
					)}
				</>
			)}

			{/* Confirmation Modal */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white rounded-lg p-6 w-96">
						<h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
						<div className="text-gray-600 mb-6">Are you sure you want to cancel order #{selectedOrderId}?</div>
						<div className="flex justify-end gap-4">
							<button
								onClick={() => setShowModal(false)}
								className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
							>
								No
							</button>
							<button
								onClick={() => handleCancelOrder(selectedOrderId)}
								className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
							>
								Yes, Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
