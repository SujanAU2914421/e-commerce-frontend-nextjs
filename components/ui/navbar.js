"use client";
import { Search, ShoppingCart, User, XIcon } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMainContext } from "@/contexts/MainContext";
import { MiniCartViewer } from "./miniCartViewer";
import Login from "@/app/auth/login/page";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";

export default function ShopNavbar() {
	const pathName = usePathname();

	const { user, showLoginPopUp, setShowLoginPopUp } = useAuthContext();

	const { searchQuery, setSearchQuery, getCategories, getProducts } = useMainContext();

	const { cartItems } = useUserInterractionContext();

	const [showSearching, setShowSearching] = useState(false);

	const [showCartList, setShowCartList] = useState(false);

	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);

	useEffect(() => {
		if (
			window.location.pathname != "/auth/login" &&
			window.location.pathname != "/auth/signup" &&
			window.location.pathname != "/checkout/information" &&
			window.location.pathname != "/checkout/check"
		) {
			getCategories();
			getProducts();
		}
		window.addEventListener("keydown", (e) => {
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
			className={`relative w-full h-16 ${!showSearching && !showCartList && "border-b"} border-gray-100`}
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
								Search for sweaters, jackets, shirts, pants, dresses, or your favorite clothing items.
							</div>
							<div className="relative w-full h-auto flex items-center gap-4">
								<div className="relative h-auto w-full">
									<input
										type="text"
										value={searchQuery || ""}
										onChange={(e) => {
											setSearchQuery(e.target.value);
										}}
										className="relative h-9 w-full outline-1 outline-gray-300 border-gray-300 border rounded-md text-sm px-4 font-medium"
										placeholder="Enter detail"
									/>
								</div>
								<Link href="/search" className="relative">
									<Button>Search</Button>
								</Link>
							</div>
							<div className="relative grid gap-4">
								<div className="relative"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showLoginPopUp && (
				<div className="fixed h-screen w-screen top-0 left-0 z-40 bg-black/10 flex items-center justify-center group">
					<div
						className="absolute top-0 left-0 h-full w-full"
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

			<div
				className={`absolute ${
					showCartList ? "right-0" : "-right-[30rem]"
				} top-16 w-[25rem] h-[calc(100vh-4rem)] z-20 bg-white duration-300 border-l ease-in-out flex`}
			>
				<MiniCartViewer setShowCartList={setShowCartList} />
			</div>
			<div className="relative h-full w-full flex justify-between items-center py-4 px-8 bg-white flex-wrap">
				<div className="relative flex gap-5 items-center">
					<Link href="/" className="relative flex items-center justify-center">
						<div className="relative text-sm font-bold font-sans">FP</div>
					</Link>
					<div className="relative h-3 w-[1px] bg-black"></div>
					<Link href="/shop/all" className="relative flex gap-3 items-center">
						<div className="relative h-auto text-sm font-bold capitalize">{"shop"}</div>
					</Link>
				</div>
				<div className="relative h-auto w-auto">
					<div className="relative h-auto w-auto flex gap-6 items-center">
						{pathName != "/search" && (
							<div
								onClick={() => {
									setShowSearching(!showSearching);
									setShowCartList(false);
								}}
								className="relative h-auto w-auto flex items-center justify-center text-gray-700 hover:rotate-6 cursor-pointer rounded-full"
							>
								{!showSearching ? <Search size={20} /> : <XIcon size={20} />}
							</div>
						)}
						{pathName != "/cart" && pathName != "/checkout" && (
							<div
								onClick={() => {
									if (user) {
										setShowCartList(!showCartList);
										setShowSearching(false);
									} else {
										console.log("User not logged in");
									}
								}}
								className="relative h-auto w-auto flex items-center justify-center text-gray-700 hover:rotate-6 cursor-pointer rounded-full"
							>
								{!showCartList ? (
									<div>
										<ShoppingCart size={20} />
										{cartItems && cartItems.length > 0 && (
											<div className="absolute z-10 flex items-center justify-center h-6 w-6 -top-3 -right-4 rounded-full bg-white">
												<div className="relative h-4 select-none w-4 bg-black rounded-full flex items-center justify-center text-xs text-white">
													{cartItems.length}
												</div>
											</div>
										)}
									</div>
								) : (
									<XIcon size={20} />
								)}
							</div>
						)}
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
									<Button variant="outline">Sign Up?</Button>
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
	);
}
