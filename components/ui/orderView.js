"use client";

import { useEffect } from "react";
import { useOrderContext } from "@/contexts/OrderContext";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";

export default function OrderView() {
	const { currentViewOrder, setCurrentViewOrder, getOrder } = useOrderContext();
	const router = useRouter(); // Initialize useRouter

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

	// Check if currentViewOrder has been set before rendering
	if (!currentViewOrder) {
		return (
			<div className="relative">
				<div className="text-center text-xl font-semibold text-gray-800">Loading order details...</div>
			</div>
		);
	}

	return (
		<div className="relative p-8">
			<Button onClick={() => router.back()}>
				<ChevronLeft size={16} />
				<span>Go Back</span>
			</Button>
			<div className="text-3xl font-semibold text-gray-800 mt-4 mb-6">Order Details</div>

			<div className="space-y-4">
				{/* Render order items */}
				{Array.isArray(currentViewOrder.order_items) &&
					currentViewOrder.order_items.map((item, index) => (
						<div key={index} className="px-4 py-4 border rounded-md space-y-2">
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Order ID:</div>
								<div className="relative text-gray-800 font-bold">{item.order_id}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Product ID:</div>
								<div className="relative text-gray-800 font-bold">{item.product_id}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Quantity:</div>
								<div className="relative text-gray-800 font-bold">{item.quantity}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Discount:</div>
								<div className="relative text-gray-800 font-bold">{item.discount}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Size:</div>
								<div className="relative text-gray-800 font-bold">{item.size}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Color:</div>
								<div className="relative text-gray-800 font-bold">{item.color}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Price:</div>
								<div className="relative text-gray-800 font-bold">{item.price}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Total Price:</div>
								<div className="relative text-gray-800 font-bold">{item.total_price}</div>
							</div>
						</div>
					))}
				<div className="relative flex gap-4 xl:flex-nowrap lg:flex-nowrap md:flex-nowrap flex-wrap">
					<div className="relative w-1/2">
						<div className="flex flex-col space-y-2 px-4 py-4 border rounded-md">
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Order Status:</div>
								<div
									className={`relative font-bold text-white text-xs rounded px-2 capitalize ${getStatusColor(
										currentViewOrder.status
									)}`}
								>
									{currentViewOrder.status}
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
								<div className="text-gray-600">Currency:</div>
								<div className="relative text-gray-800 font-bold">{currentViewOrder.currency}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Shipping Cost:</div>
								<div className="relative text-gray-800 font-bold">{currentViewOrder.shipping_cost}</div>
							</div>
						</div>
					</div>
					<div className="relative w-1/2">
						<div className="flex flex-col space-y-2 px-4 py-4 border rounded-md">
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Total Items:</div>
								<div className="relative text-gray-800 font-bold">{currentViewOrder.order_items.length}</div>
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
								<div className="relative text-gray-800 font-bold">{currentViewOrder.shipping_cost}</div>
							</div>
							<div className="relative flex items-center gap-4 flex-wrap">
								<div className="text-gray-600">Total Cost:</div>
								<div className="relative text-gray-800 font-bold">
									{currentViewOrder.currency}{" "}
									{Array.isArray(currentViewOrder.order_items)
										? currentViewOrder.order_items
												.reduce((total, item) => total + (parseFloat(item.total_price) || 0), 0)
												.toFixed(2)
										: "0.00"}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Order Address */}
				<div className="border-t pt-4 space-y-2 px-4 py-4 border rounded-md">
					<div className="font-semibold text-3xl text-gray-800">Order Address</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Email:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_email}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Name:</div>
						<div className="relative text-gray-800 font-bold">
							{currentViewOrder.order_first_name} {currentViewOrder.order_last_name}
						</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Street Address:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_street_address}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">House Number & Street Name:</div>
						<div className="relative text-gray-800 font-bold">
							{currentViewOrder.order_house_number_and_street_name}
						</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Apartment Details:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_apartment_details}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">City:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_city}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">State:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_state}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Zip:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_zip}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Phone:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_phone}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Notes:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.order_notes}</div>
					</div>
				</div>

				{/* Billing Address */}
				<div className="border-t pt-4 space-y-2 px-4 py-4 border rounded-md">
					<div className="font-semibold text-3xl text-gray-800">Billing Address</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Email:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.billing_email}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Name:</div>
						<div className="relative text-gray-800 font-bold">
							{currentViewOrder.billing_first_name} {currentViewOrder.billing_last_name}
						</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Street Address:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.billing_street_address}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">House Number & Street Name:</div>
						<div className="relative text-gray-800 font-bold">
							{currentViewOrder.billing_house_number_and_street_name}
						</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Apartment Details:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.billing_apartment_details}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">City:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.billing_city}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">State:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.billing_state}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Zip:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.billing_zip}</div>
					</div>
					<div className="relative flex items-center gap-4 flex-wrap">
						<div className="text-gray-600">Phone:</div>
						<div className="relative text-gray-800 font-bold">{currentViewOrder.billing_phone}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
