"use client";

import axios from "@/config/axios";
import { useEffect, useRef, useState } from "react";
import { CookieConsent } from "../component/cookiePopUp";
import { useAuthContext } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";

export default function Login() {
	const { login } = useAuthContext();

	const [showPassword, setShowPassword] = useState(false);

	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: null,
		password: null,
	});

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("login", { ...data });

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
					Log in to continue
				</div>

				<div
					ref={setAllTransitionElementsRef}
					style={{ opacity: 0, transform: "translateY(20px)" }}
					className="relative text-sm text-gray-700 text-center"
				>
					Welcome back! Log in to explore more and stay connected.
				</div>

				<form onSubmit={handleSubmit} className="space-y-4 pt-8">
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
					>
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<div className="relative w-full flex items-center gap-5">
							<div className="relative w-full">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={data.password}
									onChange={handleInputChange}
									required
									placeholder="Enter your Password"
									className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none text-sm focus:ring-1 focus:ring-gray-300"
								/>
								<div className="relative text-sm pt-2 flex justify-end">
									<Link
										href="/auth/forget-password"
										className="relative underline text-gray-600 hover:text-gray-800 hover:font-bold duration-200"
									>
										Forget Password?
									</Link>
								</div>
							</div>
							<div
								onClick={() => {
									setShowPassword(!showPassword);
								}}
								className="relative h-auto w-auto flex items-center justify-normal text-gray-600 hover:text-gray-800 duration-200 cursor-pointer"
							>
								{showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
							</div>
						</div>

						{errors.password && (
							<span className="text-red-500">{errors.password[0] ?? ""}</span>
						)}
					</div>

					<div
						ref={setAllTransitionElementsRef}
						style={{ opacity: 0, transform: "translateY(20px)" }}
						className="relative h-auto w-full flex"
					>
						<button
							type="submit"
							className="w-full h-10 flex items-center justify-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
						>
							Login
						</button>
					</div>
				</form>
				<div
					ref={setAllTransitionElementsRef}
					style={{ opacity: 0, transform: "translateY(20px)" }}
					className="relative text-normal text-gray-700 text-center pt-4"
				>
					Dont have an account?{" "}
					<Link
						href="/auth/signup"
						className="text-indigo-600 hover:text-indigo-800 hover:font-bold duration-200 underline"
					>
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
}
