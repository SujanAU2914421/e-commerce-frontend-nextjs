"use client";

import React, { useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react/dist/cjs/lucide-react";
import { useOrderContext } from "@/contexts/OrderContext";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function OrderInformationForm() {
	const { user } = useAuthContext();
	const { orderDataInitial, setOrderDataInitial, billingAddress, setBillingAddress } = useOrderContext();

	const [errors, setErrors] = useState({});

	const router = useRouter(); // Use Next.js router for navigation

	const validateForm = () => {
		const newErrors = {};
		if (!orderDataInitial.streetAddress?.trim()) newErrors.streetAddress = "Street address is required.";
		if (!orderDataInitial.houseNumberAndStreetName?.trim())
			newErrors.houseNumberAndStreetName = "House number and street name are required.";
		if (!orderDataInitial.city?.trim()) newErrors.city = "Town/City is required.";
		if (!orderDataInitial.state?.trim()) newErrors.state = "State is required.";
		if (!orderDataInitial.zip?.trim()) newErrors.zip = "PIN Code is required.";
		if (!orderDataInitial.phone?.trim()) newErrors.phone = "Phone number is required.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setOrderDataInitial({ ...orderDataInitial, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const handleShippingClick = (e) => {
		if (validateForm()) {
			router.push("/checkout/shipping-detail"); // Navigate to the Shipping page
		}
	};

	return (
		<div className="w-full">
			<div>
				<div className="mb-4">
					<label className="block text-gray-700">Street Address *</label>
					<input
						type="text"
						name="streetAddress"
						value={orderDataInitial.streetAddress || ""}
						onChange={handleInputChange}
						placeholder="House Number and Street Address"
						className={`w-full border ${
							errors.streetAddress ? "border-red-500" : "border-gray-300"
						} rounded-md px-3 h-9 focus:outline-gray-200`}
					/>
					{errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress}</p>}
				</div>
				<div className="mb-4">
					<input
						type="text"
						name="houseNumberAndStreetName"
						value={orderDataInitial.houseNumberAndStreetName || ""}
						onChange={handleInputChange}
						placeholder="Apartment, Suite, Unit, etc. (optional)"
						className={`w-full border ${
							errors.houseNumberAndStreetName ? "border-red-500" : "border-gray-300"
						} rounded-md px-3 h-9 focus:outline-gray-200`}
					/>
					{errors.houseNumberAndStreetName && <p className="text-red-500 text-sm">{errors.houseNumberAndStreetName}</p>}
				</div>
				<div className="relative flex gap-5 mb-4 flex-wrap">
					<div className="xl:w-1/3 lg:w-1/3 md:w-1/2 w-full">
						<label className="block text-gray-700">Town / City *</label>
						<input
							type="text"
							name="city"
							value={orderDataInitial.city || ""}
							onChange={handleInputChange}
							className={`w-full border ${
								errors.city ? "border-red-500" : "border-gray-300"
							} rounded-md px-3 h-9 focus:outline-gray-200`}
						/>
						{errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
					</div>
					<div className="xl:w-1/3 lg:w-1/3 md:w-1/2 w-full">
						<label className="block text-gray-700">State *</label>
						<input
							type="text"
							name="state"
							value={orderDataInitial.state || ""}
							onChange={handleInputChange}
							className={`w-full border ${
								errors.state ? "border-red-500" : "border-gray-300"
							} rounded-md px-3 h-9 focus:outline-gray-200`}
						/>
						{errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
					</div>
					<div className="xl:w-1/3 lg:w-1/3 md:w-1/2 w-full">
						<label className="block text-gray-700">PIN Code *</label>
						<input
							type="text"
							name="zip"
							value={orderDataInitial.zip || ""}
							onChange={handleInputChange}
							className={`w-full border ${
								errors.zip ? "border-red-500" : "border-gray-300"
							} rounded-md px-3 h-9 focus:outline-gray-200`}
						/>
						{errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Phone *</label>
					<input
						type="tel"
						name="phone"
						value={orderDataInitial.phone || ""}
						onChange={handleInputChange}
						className={`w-full border ${
							errors.phone ? "border-red-500" : "border-gray-300"
						} rounded-md px-3 h-9 focus:outline-gray-200`}
					/>
					{errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
				</div>
				<div className="relative w-full flex justify-between pt-5">
					<Link href="/checkout/cart" className="text-gray-700 text-sm">
						<Button variant="outline" size="lg">
							<ChevronLeft size={18} />
							<span className="relative text-sm">Cart</span>
						</Button>
					</Link>
					<Button size="lg" onClick={handleShippingClick}>
						<span className="relative text-sm">Shipping</span>
						<ChevronRight size={18} />
					</Button>
				</div>
			</div>
		</div>
	);
}
