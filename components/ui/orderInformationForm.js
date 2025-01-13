"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react/dist/cjs/lucide-react";

export default function OrderInformationForm({ formData, setFormData }) {
	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
		if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required.";
		if (!formData.houseNumberAndStreetName.trim())
			newErrors.houseNumberAndStreetName = "House number and street name are required.";
		if (!formData.city.trim()) newErrors.city = "Town/City is required.";
		if (!formData.state.trim()) newErrors.state = "State is required.";
		if (!formData.zip.trim()) newErrors.zip = "PIN Code is required.";
		if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form Data Submitted:", formData);
			alert("Order Placed Successfully!");
		}
	};

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700">Street Address *</label>
					<input
						type="text"
						name="streetAddress"
						value={formData.streetAddress}
						onChange={handleInputChange}
						placeholder="House Number and Street Adress"
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
						value={formData.houseNumberAndStreetName}
						onChange={handleInputChange}
						placeholder="Apartment, Suite, Unit, etc. (optional)"
						className={`w-full border ${
							errors.houseNumberAndStreetName ? "border-red-500" : "border-gray-300"
						} rounded-md px-3 h-9 focus:outline-gray-200`}
					/>
					{errors.houseNumberAndStreetName && <p className="text-red-500 text-sm">{errors.houseNumberAndStreetName}</p>}
				</div>
				<div className="relative flex gap-5 mb-4">
					<div className="w-1/3">
						<label className="block text-gray-700">Town / City *</label>
						<input
							type="text"
							name="city"
							value={formData.city}
							onChange={handleInputChange}
							className={`w-full border ${
								errors.city ? "border-red-500" : "border-gray-300"
							} rounded-md px-3 h-9 focus:outline-gray-200`}
						/>
						{errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
					</div>
					<div className="w-1/3">
						<label className="block text-gray-700">State *</label>
						<input
							type="text"
							name="state"
							value={formData.state}
							onChange={handleInputChange}
							className={`w-full border ${
								errors.state ? "border-red-500" : "border-gray-300"
							} rounded-md px-3 h-9 focus:outline-gray-200`}
						/>
						{errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
					</div>
					<div className="w-1/3">
						<label className="block text-gray-700">PIN Code *</label>
						<input
							type="text"
							name="zip"
							value={formData.zip}
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
						value={formData.phone}
						onChange={handleInputChange}
						className={`w-full border ${
							errors.phone ? "border-red-500" : "border-gray-300"
						} rounded-md px-3 h-9 focus:outline-gray-200`}
					/>
					{errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
				</div>
				<div className="relative w-full flex justify-between pt-5">
					<Button type="submit" variant="outline" size="lg">
						<ChevronLeft size={18} />
						<span className="relative text-sm">Cart</span>
					</Button>
					<Button type="submit" size="lg">
						<span className="relative text-sm">Shipping</span>
						<ChevronRight size={18} />
					</Button>
				</div>
			</form>
		</div>
	);
}
