import { useAuthContext } from "@/contexts/AuthContext";
import { useOrderContext } from "@/contexts/OrderContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import BillingAddressForm from "./billingAddressForm";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";

export default function CheckoutPaymentPage() {
	const router = useRouter(); // Use Next.js router for navigation
	const { user } = useAuthContext();
	const {
		orderDataInitial,
		setOrderDataInitial,
		useSameAddress,
		setUseSameAddress,
		billingAddress,
		setBillingAddress,
		agreeWithTerms,
		setAgreeWithTerms,
		addOrder,
	} = useOrderContext();
	const { cartItems } = useUserInterractionContext();

	const [paymentErrors, setPaymentErrors] = useState({});

	const [agreeWithTermsError, setAgreeWithTermsError] = useState("");

	const validateForm = () => {
		const newErrors = {};
		if (!billingAddress.firstName.trim()) newErrors.firstName = "First name is required.";
		if (!billingAddress.lastName.trim()) newErrors.lastName = "Last Name is required.";
		if (!billingAddress.email.trim()) newErrors.email = "Email is required.";
		if (!billingAddress.streetAddress.trim()) newErrors.streetAddress = "Street address is required.";
		if (!billingAddress.houseNumberAndStreetName.trim())
			newErrors.houseNumberAndStreetName = "House number and street name are required.";
		if (!billingAddress.city.trim()) newErrors.city = "Town/City is required.";
		if (!billingAddress.state.trim()) newErrors.state = "State is required.";
		if (!billingAddress.zip.trim()) newErrors.zip = "PIN Code is required.";
		if (!billingAddress.phone.trim()) newErrors.phone = "Phone number is required.";

		setPaymentErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	``;
	const handleSubmit = () => {
		console.log(cartItems);

		if (useSameAddress) {
			if (!agreeWithTerms) {
				setAgreeWithTermsError("You must agree to the terms and conditions.");
			} else {
				addOrder();
				setAgreeWithTermsError("");
			}
		} else {
			if (validateForm()) {
				addOrder();
			}
		}
	};

	const handleChange = (field, value) => {
		setBillingAddress((prev) => ({ ...prev, [field]: value }));
	};

	if (user) {
		return (
			<div className="w-full">
				{/* Contact Section */}
				<div className="mb-4">
					<h2 className="text-gray-700 font-semibold">Contact</h2>
					<p className="text-gray-600">{user.email}</p>
					{!user.email && (
						<button
							onClick={() =>
								handleChange(
									"email",
									prompt("Enter new email address:", orderDataInitial.email) || orderDataInitial.email
								)
							}
							className="text-blue-500 hover:underline text-sm"
						>
							Change
						</button>
					)}
				</div>

				{/* Ship To Section */}
				<div className="mb-8">
					<h2 className="text-gray-700 font-semibold">Ship To</h2>
					<p className="text-gray-600">
						{orderDataInitial.streetAddress}, {orderDataInitial.houseNumberAndStreetName}, {orderDataInitial.city}{" "}
						{orderDataInitial.zip}, {orderDataInitial.state}
					</p>
					<Link href="/checkout/information" className="text-blue-500 hover:underline text-sm">
						Change
					</Link>
				</div>

				<div className="relative h-auto w-auto mb-10">
					<div className="relative">
						<div className="relative text-3xl text-gray-700 mb-4">Billing Address</div>
						<div className="relative h-auto w-full border rounded-md divide-y">
							{/* Same as Shipping Address */}
							<div
								onClick={() => {
									setUseSameAddress(true);
								}}
								className={`relative h-auto px-4 cursor-pointer py-4 flex items-center gap-4 ${
									useSameAddress ? "font-bold" : "font-normal"
								} text-gray-700`}
							>
								<div className="relative h-4 w-4 rounded-full flex items-center justify-center border-gray-700 p-[2px] border-2">
									<div
										className={`relative h-full w-full duration-300 ${
											!useSameAddress ? "scale-0" : "scale-100"
										} rounded-full bg-gray-600`}
									></div>
								</div>
								<div className="relative">Same as shipping address</div>
							</div>

							{/* Use Different Billing Address */}
							<div
								onClick={() => {
									setUseSameAddress(false);
								}}
								className={`relative h-auto px-4 cursor-pointer py-4 flex items-center gap-4 ${
									!useSameAddress ? "font-bold" : "font-normal"
								} text-gray-700`}
							>
								<div className="relative h-4 w-4 rounded-full flex items-center justify-center border-gray-700 p-[2px] border-2">
									<div
										className={`relative h-full w-full duration-300 ${
											useSameAddress ? "scale-0" : "scale-100"
										} rounded-full bg-gray-600`}
									></div>
								</div>
								<div className="relative">Use Different Billing Address</div>
							</div>
							{!useSameAddress && <BillingAddressForm errors={paymentErrors} setErrors={setPaymentErrors} />}
						</div>
					</div>
				</div>
				<div className="relative w-full h-auto mb-5">
					<div className="relative">
						<div className="relative text-3xl text-gray-700 mb-4">Payment</div>
						<div className="relative mb-5">All transactions are secure and encrypted.</div>
						<div className="relative border rounded-md">
							<div className="relative h-auto px-4 cursor-pointer py-4 flex items-center gap-4">
								<div className="relative h-4 w-4 rounded-full flex items-center justify-center border-gray-700 p-[2px] border-2">
									<div className={`relative h-full w-full duration-300 rounded-full bg-gray-600`}></div>
								</div>
								<div className="relative">Cash On Delivery</div>
							</div>
							<div className="relative text-sm text-gray-700 px-8 pb-6 pt-2">Pay with cash upon delivery.</div>
						</div>
					</div>
				</div>
				<div className="relative mb-5">
					<div className="relative text-gray-700 mb-4">
						Your personal data will be used to process your order, support your experience throughout this website, and
						for other purposes described in our{" "}
						<Link href={"/privacy-policy"} className="underline">
							privacy policy
						</Link>
						.
					</div>
					<div className="relative">
						<div className="relative h-auto w-auto flex items-center">
							<input
								type="checkbox"
								id="agreeWithTerms"
								checked={agreeWithTerms}
								onChange={() => setAgreeWithTerms(!agreeWithTerms)}
								className="mr-2 h-4 w-4 accent-gray-700 cursor-pointer"
								aria-checked={agreeWithTerms}
							/>
							<div className="relative text-gray-700">
								<label htmlFor="agreeWithTerms" className="relative cursor-pointer">
									I have read and agree to the website{" "}
								</label>
								<Link href={"/privacy-policy"} className="underline hover:font-bold">
									Terms & Conditions
								</Link>
								.
							</div>
						</div>
						<div className="relative pt-2">
							{agreeWithTermsError && <p className="text-red-500 text-sm">{agreeWithTermsError}</p>}
						</div>
					</div>
				</div>
				<div className="relative h-auto w-full">
					<div
						onClick={() => {
							handleSubmit();
						}}
						className="relative cursor-pointer h-14 w-full bg-black flex items-center justify-center text-white gap-4 uppercase font-bold"
					>
						<Lock className="relative h-4 w-4 text-white" />
						<div className="relative">Place Order</div>
					</div>
				</div>
			</div>
		);
	} else {
		return "";
	}
}
