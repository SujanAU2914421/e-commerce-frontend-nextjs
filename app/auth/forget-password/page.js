"use client";

import { useEffect, useRef, useState } from "react";
import { CookieConsent } from "../component/cookiePopUp";
import { Eye, EyeOff } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);

	const [data, setData] = useState({
		email: "",
	});

	const [errors, setErrors] = useState({
		email: null,
	});

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("forget-password", { ...data });

			if (response.status == 200) {
				if (response.token !== undefined) {
					login(response.token);
				}
			}
		} catch (error) {
			if (error.status == 422) {
				setErrors(error.data.errors);
			}
			console.error(error);
		}
	};

	const allTransitionElementsRef = useRef([]);

	const setAllTransitionElementsRef = (el) => {
		if (el && !allTransitionElementsRef.current.includes(el)) {
			allTransitionElementsRef.current.push(el); // Add element to refs array
		}
	};

	useEffect(() => {
		allTransitionElementsRef.current.forEach((el, index) => {
			if (el) {
				el.style.transition = "opacity 1s ease, transform 0.3s ease";
				el.style.transitionDelay = `${index * 0.05}s`; // Increment delay
				el.style.opacity = 1;
				el.style.transform = "translateY(0)";
			}
		});
	}, []);

	return (
		<div
			className="size-full p-6 bg-white content-center"
			style={{ fontFamily: "afacad-flux" }}
		>
			<div className="mx-auto xl:w-96 lg:w-96 md:w-96 sm:w-96 w-full max-w-lg h-auto duration-200">
				<CookieConsent />

				<div
					ref={setAllTransitionElementsRef}
					style={{ opacity: 0, transform: "translateY(20px)" }}
					className="text-2xl font-semibold mb-6 text-center"
				>
					Recover
				</div>

				<div
					ref={setAllTransitionElementsRef}
					style={{ opacity: 0, transform: "translateY(20px)" }}
					className="relative text-sm text-gray-700 text-center"
				>
					Recover your account to regain access and continue where you left off!
				</div>

				<form onSubmit={handleSubmit} className="space-y-4 pt-4">
					<div
						ref={setAllTransitionElementsRef}
						style={{ opacity: 0, transform: "translateY(20px)" }}
					>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={data.email}
							onChange={handleInputChange}
							required
							placeholder="Enter your Email"
							className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none text-sm focus:ring-1 focus:ring-gray-300"
						/>

						{errors.email && (
							<span className="text-red-500">{errors.email[0] ?? ""}</span>
						)}
					</div>

					<div
						ref={setAllTransitionElementsRef}
						style={{ opacity: 0, transform: "translateY(20px)" }}
						className="relative h-auto w-full flex"
					>
						<button
							type="submit"
							className="w-full h-10 flex items-center justify-center mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
						>
							Send Recovery Mail
						</button>
					</div>
				</form>
				<div
					ref={setAllTransitionElementsRef}
					style={{ opacity: 0, transform: "translateY(20px)" }}
					className="relative text-normal text-gray-700 text-center pt-4"
				>
					Remember password?{" "}
					<Link
						href="/auth/login"
						className="text-indigo-600 hover:text-indigo-800 hover:font-bold duration-200 underline"
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
