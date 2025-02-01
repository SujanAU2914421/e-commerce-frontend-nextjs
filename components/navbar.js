"use client";

import Login from "@/app/auth/login/page";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMainContext } from "@/contexts/MainContext";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { Heart, Search, ShoppingCart, User, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MiniCartViewer } from "./miniCartViewer";
import { Button } from "./ui/button";

export default function ShopNavbar() {
	const router = useRouter();
	const pathName = usePathname();

	const { user, showLoginPopUp, setShowLoginPopUp } = useAuthContext();

	const { searchQuery, setSearchQuery, getCategories, getProducts } =
		useMainContext();

	const { cartItems } = useUserInterractionContext();

	const [showSearching, setShowSearching] = useState(false);

	const searchInputFieldRef = useRef(null);

	const [showCartList, setShowCartList] = useState(false);

	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);

	const searchSubmitHandler = (e) => {
		e.preventDefault();
		const query = searchQuery?.trim(); // Trim the search query to avoid extra spaces
		if (query && query !== "") {
			const params = new URLSearchParams();
			params.set("query", query); // Set the query parameter
			router.push(`/search?${params.toString()}`); // Redirect with query parameters
		}
	};
	useEffect(() => {
		if (showSearching && searchInputFieldRef.current) {
			searchInputFieldRef.current.focus();
		} else if (searchInputFieldRef.current) {
			searchInputFieldRef.current.blur();
		}
	}, [showSearching]);

	const productLink = pathName.split("/")[3];
	const mainPathName = pathName.split("/")[1];

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			// if (e.key === "Enter" && window.location.pathname != "/search") {
			// 	setShowSearching(true);
			// 	setShowCartList(false);
			// }

			if (e.key === "Escape") {
				setShowSearching(false);
				setShowCartList(false);
			}
		});
		return () => {
			window.removeEventListener("keydown", (e) => {
				if (e.key === "Escape") {
					setShowSearching(false);
				}
			});
		};
	}, []);

	return (
		<div
			className={`relative w-full h-16`}
			onMouseMove={(e) => {
				setPosX(e.clientX);
				setPosY(e.clientY);
			}}
		>
			{showCartList && (
				<div
					className="fixed top-0 left-0 h-full w-full bg-black/10 group"
					onClick={() => {
						setShowCartList(false);
						setShowSearching(false);
						setShowLoginPopUp(false);
					}}
				>
					<div
						style={{
							left: posX - 15 + "px",
							top: posY - 15 + "px",
							height: 30,
							width: 30,
						}}
						className="absolute"
					>
						<div className="relative h-full w-full rounded-full bg-white/80 flex items-center justify-center group-hover:opacity-100 opacity-0 text-red-500 cursor-pointer">
							<XIcon size={20} stroke="currentColor" />
						</div>
					</div>
				</div>
			)}
			{showLoginPopUp && (
				<div className="fixed h-screen w-screen top-0 left-0 z-40 bg-black/10 flex items-center justify-center">
					<div
						className="absolute top-0 left-0 h-full w-full group"
						onClick={() => {
							setShowLoginPopUp(false);
						}}
					>
						<div
							style={{
								left: posX - 15 + "px",
								top: posY - 15 + "px",
								height: 30,
								width: 30,
							}}
							className="absolute"
						>
							<div className="relative h-full w-full rounded-full bg-white/80 flex items-center justify-center group-hover:opacity-100 opacity-0 text-red-500 cursor-pointer">
								<XIcon size={20} stroke="currentColor" />
							</div>
						</div>
					</div>
					<Login />
				</div>
			)}
			{showSearching && (
				<div
					className="fixed top-0 left-0 h-full w-full bg-black/10 group"
					onClick={() => {
						setShowCartList(false);
						setShowSearching(false);
						setShowLoginPopUp(false);
					}}
				>
					<div
						style={{
							left: posX - 15 + "px",
							top: posY - 15 + "px",
							height: 30,
							width: 30,
						}}
						className="absolute"
					>
						<div className="relative h-full w-full rounded-full bg-white/80 flex items-center justify-center group-hover:opacity-100 opacity-0 text-red-500 cursor-pointer">
							<XIcon size={20} stroke="currentColor" />
						</div>
					</div>
				</div>
			)}

			<div
				className={`absolute left-0 ${
					showSearching ? "top-0" : "-top-[300px]"
				} duration-300 ease-in-out w-[100vw] h-auto pt-16`}
			>
				<div className="relative h-auto w-full bg-white flex items-center justify-center pt-8 pb-4">
					<div className="relative h-auto xl:w-[50vw] lg:w-[50vw] md:w-[70vw] sm:w-[80vw] w-full px-4">
						<div className="relative grid gap-8">
							<div className="relative text-sm text-gray-700">
								Search for your favorite clothing items.
							</div>
							<form
								onSubmit={searchSubmitHandler}
								className="relative w-full h-auto flex items-center gap-4"
							>
								<div className="relative h-auto w-full">
									<input
										type="text"
										ref={searchInputFieldRef}
										value={searchQuery || ""}
										onChange={(e) => {
											setSearchQuery(e.target.value);
										}}
										className="relative h-9 w-full outline-1 outline-gray-300 border-gray-300 border rounded-md text-sm px-4 font-medium"
										placeholder="Enter detail"
									/>
								</div>
								<Button type="submit">Search</Button>
							</form>
							<div className="relative grid gap-4">
								<div className="relative"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`absolute ${
					showCartList ? "right-0" : "-right-[30rem]"
				} top-16 w-[25rem] h-[calc(100vh-4rem)] z-20 bg-white duration-300 ease-in-out flex`}
			>
				<MiniCartViewer setShowCartList={setShowCartList} />
			</div>
			<div className="relative h-full w-full flex justify-center bg-white">
				<div className="relative h-full w-full flex justify-between items-center py-4 flex-wrap xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] xl:px-0 lg:px-0 md:px-0 px-4">
					<div className="relative flex gap-8 items-center">
						<div className="relative flex gap-5 items-center">
							<Link
								href="/"
								className="relative flex items-center justify-center"
							>
								<div className="relative text-sm font-bold font-sans">
									FP
								</div>
							</Link>

							<div className="relative h-3 w-[1px] bg-black"></div>

							<Link
								href="/shop/all"
								className="relative flex gap-3 items-center"
							>
								<div className="relative h-auto text-sm font-bold capitalize">
									{"shop"}
								</div>
							</Link>
						</div>
					</div>
					<div className="relative h-auto w-auto xl:flex lg:flex hidden items-center gap-8 text-gray-700 text-sm uppercase">
						<Link href="/shop/all" className="relative group">
							<div
								className={`relative cursor-pointer ${
									mainPathName == "shop"
										? "text-black font-bold"
										: "text-gray-700 group-hover:text-gray-700 group-hover:font-bold"
								}`}
							>
								Explore
							</div>
							<div
								className={`absolute -bottom-1 ${
									mainPathName == "shop"
										? "w-1/2"
										: "w-0 group-hover:w-1/2"
								} duration-300 h-[2px] rounded-full bg-gray-600`}
							></div>
						</Link>
						<Link href="/about#services" className="relative group">
							<div
								className={`relative cursor-pointer ${
									pathName === "services"
										? "text-black font-bold"
										: "text-gray-700 group-hover:text-gray-700 group-hover:font-bold"
								}`}
							>
								Services
							</div>
							<div
								className={`absolute -bottom-1 ${
									pathName === "services"
										? "w-1/2"
										: "w-0 group-hover:w-1/2"
								} duration-300 h-[2px] rounded-full bg-gray-600`}
							></div>
						</Link>
						<Link href="/about" className="relative group">
							<div
								className={`relative cursor-pointer ${
									pathName === "about"
										? "text-black font-bold"
										: "text-gray-700 group-hover:text-gray-700 group-hover:font-bold"
								}`}
							>
								About Us
							</div>
							<div
								className={`absolute -bottom-1 ${
									pathName === "about"
										? "w-1/2"
										: "w-0 group-hover:w-1/2"
								} duration-300 h-[2px] rounded-full bg-gray-600`}
							></div>
						</Link>
					</div>
					<div className="relative h-auto w-auto">
						<div className="relative h-auto w-auto flex gap-8 items-center">
							<div className="relative h-auto w-auto flex gap-6 items-center">
								{pathName != "/search" && (
									<div
										onClick={() => {
											setShowSearching(!showSearching);
											setShowCartList(false);
										}}
										className="relative h-auto w-auto flex items-center justify-center text-gray-700 hover:rotate-6 cursor-pointer rounded-full"
									>
										{!showSearching ? (
											<Search size={20} />
										) : (
											<XIcon size={20} />
										)}
									</div>
								)}
								<div
									onClick={() => {
										if (mainPathName != "cart") {
											if (user) {
												setShowCartList(!showCartList);
												setShowSearching(false);
											} else {
												setShowLoginPopUp(true);
											}
										}
									}}
									className="relative h-auto w-auto flex items-center justify-center text-gray-700 hover:rotate-6 cursor-pointer rounded-full"
								>
									<ShoppingCart
										fill={
											mainPathName === "cart"
												? "currentColor"
												: "none"
										}
										size={20}
									/>
									{cartItems && cartItems.length > 0 && (
										<div className="absolute z-10 flex items-center justify-center h-6 w-6 -top-3 -right-4 rounded-full bg-white">
											<div className="relative h-4 select-none w-4 bg-black rounded-full flex items-center justify-center text-xs text-white">
												{cartItems.length}
											</div>
										</div>
									)}
								</div>
								<Link href="/wishlist">
									<div className="relative h-auto w-auto flex items-center justify-center text-gray-700 hover:rotate-6 cursor-pointer rounded-full">
										<Heart
											fill={
												mainPathName === "wishlist"
													? "currentColor"
													: "none"
											}
											size={20}
										/>
										{cartItems && cartItems.length > 0 && (
											<div className="absolute z-10 flex items-center justify-center h-6 w-6 -top-3 -right-4 rounded-full bg-white">
												<div className="relative h-4 select-none w-4 bg-black rounded-full flex items-center justify-center text-xs text-white">
													{cartItems.length}
												</div>
											</div>
										)}
									</div>
								</Link>
							</div>
							{user ? (
								<Link
									href="/account/profile"
									className="relative h-10 w-10 flex items-center justify-center text-gray-100 bg-gray-800 rounded-full"
								>
									<User size={20} />
								</Link>
							) : (
								<div className="relative flex items-center gap-4">
									<Link href="/auth/signup">
										<Button variant="outline">
											Sign Up?
										</Button>
									</Link>
									<Link href="/auth/login">
										<Button variant="default">Login</Button>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
