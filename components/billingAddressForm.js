import { useOrderContext } from "@/contexts/OrderContext";
import React, { useState } from "react";

export default function BillingAddressForm({ errors, setErrors }) {
	const { billingAddress, setBillingAddress } = useOrderContext();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBillingAddress({ ...billingAddress, [name]: value });
		setErrors({ ...errors, [name]: "" });
	};

	return (
		<div className="relative h-auto w-full px-4 py-4">
			<div className="relative flex *:w-1/2 gap-5">
				<div className="mb-4">
					<label className="block text-gray-700">First Name *</label>
					<input
						type="text"
						name="firstName"
						value={billingAddress.firstName}
						onChange={handleInputChange}
						placeholder="House Number and Street Adress"
						className={`w-full border ${
							errors.firstName ? "border-red-500" : "border-gray-300"
						} rounded-md px-3 h-9 focus:outline-gray-200`}
					/>
					{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Last Name *</label>
					<input
						type="text"
						name="lastName"
						value={billingAddress.lastName}
						onChange={handleInputChange}
						placeholder="House Number and Street Adress"
						className={`w-full border ${
							errors.lastName ? "border-red-500" : "border-gray-300"
						} rounded-md px-3 h-9 focus:outline-gray-200`}
					/>
					{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
				</div>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Email *</label>
				<input
					type="email"
					name="email"
					value={billingAddress.email}
					onChange={handleInputChange}
					placeholder="House Number and Street Adress"
					className={`w-full border ${
						errors.email ? "border-red-500" : "border-gray-300"
					} rounded-md px-3 h-9 focus:outline-gray-200`}
				/>
				{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
			</div>
			<div className="mb-4">
				<label className="block text-gray-700">Street Address *</label>
				<input
					type="text"
					name="streetAddress"
					value={billingAddress.streetAddress}
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
					value={billingAddress.houseNumberAndStreetName}
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
						value={billingAddress.city}
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
						value={billingAddress.state}
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
						value={billingAddress.zip}
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
					value={billingAddress.phone}
					onChange={handleInputChange}
					className={`w-full border ${
						errors.phone ? "border-red-500" : "border-gray-300"
					} rounded-md px-3 h-9 focus:outline-gray-200`}
				/>
				{errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
			</div>
		</div>
	);
}
