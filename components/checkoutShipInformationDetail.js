import { useAuthContext } from "@/contexts/AuthContext";
import { useOrderContext } from "@/contexts/OrderContext";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

export default function CheckoutShipInformationDetail() {
	const { user } = useAuthContext();
	const { orderDataInitial, setOrderDataInitial } = useOrderContext();

	const handleChange = (field, value) => {
		setOrderDataInitial((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div>
			{/* Contact Section */}
			<div className="mb-4">
				<h2 className="text-gray-700 font-semibold">Contact</h2>
				<p className="text-gray-600">{orderDataInitial.email}</p>
			</div>

			{/* Ship To Section */}
			<div className="mb-8">
				<h2 className="text-gray-700 font-semibold">Ship To</h2>
				<p className="text-gray-600">
					{orderDataInitial.streetAddress},{" "}
					{orderDataInitial.houseNumberAndStreetName},{" "}
					{orderDataInitial.city} {orderDataInitial.zip},{" "}
					{orderDataInitial.state}
				</p>
				<Link
					href={"/checkout/information"}
					className="text-blue-500 hover:underline text-sm"
				>
					Change
				</Link>
			</div>

			{/* Order Notes Section */}
			<div className="mb-4">
				<h2 className="text-gray-700 font-semibold">Order Notes</h2>
				<textarea
					placeholder="Add any notes for your order (optional)"
					value={orderDataInitial.orderNotes}
					onChange={(e) => handleChange("orderNotes", e.target.value)}
					className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-gray-200"
				/>
				<div className="relative h-auto w-full flex items-center justify-end">
					<Link href={"/checkout/payment"}>
						<Button>Continue To payment</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
