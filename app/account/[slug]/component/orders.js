// pages/orders.js

import React, { useState } from "react";
import OrdersList from "./ordersList";
import OrderView from "./orderView";
import {
	Clock,
	DollarSign,
	ShoppingBasket,
	ShoppingCart,
	X,
} from "lucide-react/dist/cjs/lucide-react";

const Orders = () => {
	const [currentOrderViewIndex, setCurrentOrderViewIndex] = useState(0);
	const [viewingOrder, setViewingOrder] = useState(false);
	const orders = [
		{
			id: 1,
			name: "AirPods Pro 2",
			orderDate: "May 1, 2022",
			deliveryService: "Express",
			paymentMethod: "Credit Card",
			status: "Delivered",
			pieces: 2,
			costPerPiece: 249.99,
			transactionFee: 5.0,
			deliveryFee: 10.0,
			total: 519.98,
			description:
				"The AirPods Pro 2 features Apple's latest H2 chip, providing an even better sound experience, improved active noise cancellation, and personalized spatial audio. The earphones come with multiple sizes of silicone tips for a secure fit, and the updated case offers MagSafe charging with Find My functionality.",
		},
		{
			id: 2,
			name: "MacBook Pro 16-inch",
			orderDate: "April 15, 2022",
			deliveryService: "Standard",
			paymentMethod: "PayPal",
			status: "Shipped",
			pieces: 1,
			costPerPiece: 2399.0,
			transactionFee: 25.0,
			deliveryFee: 20.0,
			total: 2444.0,
			description:
				"The 16-inch MacBook Pro with Apple’s M1 Pro chip offers a stunning Retina display, up to 64GB of RAM, and a battery life of up to 21 hours. It is a powerhouse designed for professionals who need advanced performance and graphics.",
		},
		{
			id: 3,
			name: "Apple Watch Series 7",
			orderDate: "March 20, 2022",
			deliveryService: "Express",
			paymentMethod: "Credit Card",
			status: "Cancelled",
			pieces: 1,
			costPerPiece: 399.99,
			transactionFee: 7.0,
			deliveryFee: 10.0,
			total: 416.99,
			description:
				"The Apple Watch Series 7 features a larger, always-on Retina display, faster charging, and improved durability. It's designed to help you stay active, healthy, and connected with advanced health sensors and customizable watch faces.",
		},
		{
			id: 4,
			name: "iPad Pro 12.9-inch",
			orderDate: "June 1, 2022",
			deliveryService: "Express",
			paymentMethod: "Credit Card",
			status: "Shipped",
			pieces: 1,
			costPerPiece: 1099.0,
			transactionFee: 22.0,
			deliveryFee: 15.0,
			total: 1136.0,
			description:
				"The 12.9-inch iPad Pro with M1 chip is the ultimate tablet for productivity and entertainment. It boasts a stunning Liquid Retina XDR display, high-speed 5G connectivity, and works seamlessly with the Magic Keyboard and Apple Pencil.",
		},
		{
			id: 5,
			name: "Beats Fit Pro",
			orderDate: "February 10, 2022",
			deliveryService: "Standard",
			paymentMethod: "Credit Card",
			status: "Delivered",
			pieces: 1,
			costPerPiece: 199.99,
			transactionFee: 4.0,
			deliveryFee: 8.0,
			total: 211.99,
			description:
				"Beats Fit Pro features active noise cancellation, a secure fit, and great sound quality, ideal for workouts or commuting. These wireless earbuds are powered by Apple’s H1 chip and are compatible with both iOS and Android devices.",
		},
		{
			id: 6,
			name: "iPhone 13 Pro Max",
			orderDate: "January 5, 2022",
			deliveryService: "Express",
			paymentMethod: "Credit Card",
			status: "Shipped",
			pieces: 1,
			costPerPiece: 1099.0,
			transactionFee: 22.0,
			deliveryFee: 15.0,
			total: 1136.0,
			description:
				"The iPhone 13 Pro Max comes with a 6.7-inch OLED display, A15 Bionic chip, and an advanced triple-camera system. It supports 5G and offers up to 1TB of storage, making it the most powerful iPhone ever.",
		},
		{
			id: 7,
			name: "AirPods Max",
			orderDate: "December 18, 2021",
			deliveryService: "Standard",
			paymentMethod: "Credit Card",
			status: "Cancelled",
			pieces: 1,
			costPerPiece: 549.0,
			transactionFee: 10.0,
			deliveryFee: 12.0,
			total: 571.0,
			description:
				"AirPods Max offers high-fidelity sound with active noise cancellation, spatial audio, and the H1 chip in each ear cup. It’s a premium over-ear headphone designed for audiophiles who demand the best sound quality.",
		},
		{
			id: 8,
			name: "iMac 24-inch",
			orderDate: "May 22, 2022",
			deliveryService: "Express",
			paymentMethod: "PayPal",
			status: "Delivered",
			pieces: 1,
			costPerPiece: 1299.0,
			transactionFee: 25.0,
			deliveryFee: 30.0,
			total: 1354.0,
			description:
				"The 24-inch iMac features a 4.5K Retina display, the M1 chip for exceptional performance, and a colorful, sleek design. It comes with a 1080p FaceTime HD camera and studio-quality microphones for a powerful, all-in-one experience.",
		},
		{
			id: 9,
			name: "Apple TV 4K",
			orderDate: "March 5, 2022",
			deliveryService: "Standard",
			paymentMethod: "Apple Pay",
			status: "Shipped",
			pieces: 1,
			costPerPiece: 179.0,
			transactionFee: 3.0,
			deliveryFee: 10.0,
			total: 192.0,
			description:
				"The Apple TV 4K lets you stream high-quality 4K HDR content from Apple TV+, Netflix, Disney+, and more. It includes the new Siri Remote and supports Dolby Vision, Dolby Atmos, and a wide range of streaming apps.",
		},
		{
			id: 10,
			name: "Magic Keyboard for iPad Pro",
			orderDate: "October 18, 2022",
			deliveryService: "Standard",
			paymentMethod: "Credit Card",
			status: "Delivered",
			pieces: 1,
			costPerPiece: 299.0,
			transactionFee: 6.0,
			deliveryFee: 5.0,
			total: 310.0,
			description:
				"The Magic Keyboard for iPad Pro offers a floating design with a backlit keyboard, trackpad, and USB-C pass-through charging. It transforms your iPad Pro into a powerful laptop replacement, perfect for working on the go.",
		},
	];

	return (
		<div className="relative h-auto w-full pt-8">
			<div className="relative h-auto w-auto">
				<div className="relative flex gap-6 w-full flex-wrap">
					<div className="relative h-20 min-w-56 rounded-md bg-gray-800 text-gray-100 shadow-sm overflow-hidden cursor-pointer">
						<div className="relative h-full flex items-center">
							<div className="relative h-20 w-20  flex items-center justify-center">
								<DollarSign size={35} />
							</div>
							<div className="relative grid gap-1 pl-4 pr-4">
								<div className="relative text-sm">Total spent</div>
								<div className="relative text-xl font-bold">
									${orders.reduce((sum, order) => sum + order.total, 0)}
								</div>
							</div>
						</div>
					</div>
					<div className="relative h-20 min-w-56 rounded-md bg-gray-800 text-gray-100 shadow-sm overflow-hidden cursor-pointer">
						<div className="relative h-full flex items-center">
							<div className="relative h-20 w-20  flex items-center justify-center">
								<ShoppingCart size={35} />
							</div>
							<div className="relative grid gap-1 pl-4">
								<div className="relative text-sm">Total orders</div>
								<div className="relative text-xl font-bold">
									{orders.length}
								</div>
							</div>
						</div>
					</div>
					<div className="relative h-20 min-w-56 rounded-md bg-gray-800 text-gray-100 shadow-sm overflow-hidden cursor-pointer">
						<div className="relative h-full flex items-center">
							<div className="relative h-20 w-20  flex items-center justify-center">
								<Clock size={35} />
							</div>
							<div className="relative grid gap-1 pl-4">
								<div className="relative text-sm">Order in Time</div>
								<div className="relative text-xl font-bold">
									{
										orders.filter((order) => order.status === "Delivered")
											.length
									}
								</div>
							</div>
						</div>
					</div>
					<div className="relative h-20 min-w-56 rounded-md bg-gray-800 text-gray-100 shadow-sm overflow-hidden cursor-pointer">
						<div className="relative h-full flex items-center">
							<div className="relative h-20 w-20  flex items-center justify-center">
								<X size={35} />
							</div>
							<div className="relative grid gap-1 pl-4">
								<div className="relative text-sm">Cancelled Orders</div>
								<div className="relative text-xl font-bold">
									{
										orders.filter((order) => order.status === "Cancelled")
											.length
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative h-auto w-auto pt-8">
				<div className="relative h-auto w-auto">
					<div className="relative h-auto w-auto flex gap-4">
						<div className="relative flex w-56 h-10 items-center border overflow-hidden rounded-md">
							<div className="relative pl-4">
								<svg
									width="17"
									height="17"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="11" cy="11" r="8"></circle>
									<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
								</svg>
							</div>
							<div className="relative h-full w-full">
								<input
									type="text"
									className="relative h-full w-full outline-none border-none text-sm px-4"
									placeholder="Search"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<OrdersList
				orders={orders}
				currentOrderViewIndex={currentOrderViewIndex}
				setCurrentOrderViewIndex={setCurrentOrderViewIndex}
				viewingOrder={viewingOrder}
				setViewingOrder={setViewingOrder}
			/>
			{viewingOrder && (
				<OrderView
					item={orders[currentOrderViewIndex]}
					currentOrderViewIndex={currentOrderViewIndex}
					setCurrentOrderViewIndex={setCurrentOrderViewIndex}
					viewingOrder={viewingOrder}
					setViewingOrder={setViewingOrder}
				/>
			)}
		</div>
	);
};

export default Orders;
