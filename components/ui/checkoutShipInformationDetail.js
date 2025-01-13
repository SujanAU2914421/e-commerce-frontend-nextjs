import React from "react";

export default function CheckoutShipInformationDetail({ formData, setFormData }) {
	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div>
			{/* Contact Section */}
			<div className="mb-4">
				<h2 className="text-gray-700 font-semibold">Contact</h2>
				<p className="text-gray-600">{formData.email}</p>
				<button
					onClick={() => handleChange("email", prompt("Enter new email address:", formData.email) || formData.email)}
					className="text-blue-500 hover:underline text-sm"
				>
					Change
				</button>
			</div>

			{/* Ship To Section */}
			<div className="mb-4">
				<h2 className="text-gray-700 font-semibold">Ship To</h2>
				<p className="text-gray-600">
					{formData.streetAddress}, {formData.houseNumberAndStreetName}, {formData.city} {formData.zip},{" "}
					{formData.state}
				</p>
				<button
					onClick={() => {
						const newStreet = prompt("Enter new street address:", formData.streetAddress) || formData.streetAddress;
						const newCity = prompt("Enter new city:", formData.city) || formData.city;
						const newState = prompt("Enter new state:", formData.state) || formData.state;
						const newZip = prompt("Enter new PIN code:", formData.zip) || formData.zip;
						handleChange("streetAddress", newStreet);
						handleChange("city", newCity);
						handleChange("state", newState);
						handleChange("zip", newZip);
					}}
					className="text-blue-500 hover:underline text-sm"
				>
					Change
				</button>
			</div>

			{/* Order Notes Section */}
			<div className="mb-4">
				<h2 className="text-gray-700 font-semibold">Order Notes</h2>
				<textarea
					placeholder="Add any notes for your order (optional)"
					value={formData.orderNotes}
					onChange={(e) => handleChange("orderNotes", e.target.value)}
					className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-gray-200"
				/>
			</div>
		</div>
	);
}
