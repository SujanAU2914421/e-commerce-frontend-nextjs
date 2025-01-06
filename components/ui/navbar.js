"use client";
import {
	Search,
	ShoppingCart,
	User,
	XIcon,
} from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function ShopNavbar({
	categories,
	shopCurrentCategory,
	setShopCurrentCategory,
}) {
	const pathName = usePathname();

	const [showSearching, setShowSearching] = useState(false);

	const [showCartList, setShowCartList] = useState(false);

	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);

	useEffect(() => {
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
			className={`relative w-full h-16 ${
				!showSearching && "border-b"
			} border-gray-100`}
		>
			{showSearching && (
				<div className="absolute left-0 top-0 w-[100vw] h-[100vh] bg-black/50 pt-16">
					<div
						className="absolute top-0 left-0 group h-full w-full"
						onMouseMove={(e) => {
							setPosX(e.clientX);
							setPosY(e.clientY);
						}}
						onClick={() => {
							setShowSearching(false);
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
					<div className="relative h-auto w-full bg-white flex items-center justify-center pt-8 pb-4">
						<div className="relative h-auto xl:w-[50vw] lg:w-[50vw] md:w-[70vw] sm:w-[80vw] w-full px-4">
							<div className="relative grid gap-8">
								<div className="relative text-sm text-gray-700">
									Search for sweaters, jackets, shirts, pants, dresses, or your
									favorite clothing items.
								</div>
								<div className="relative w-full h-auto flex items-center gap-4">
									<div className="relative h-auto w-full">
										<input
											type="text"
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
			)}
			<div
				className={`absolute ${
					showCartList ? "right-0" : "-right-1/3"
				} top-16 w-1/3 h-[calc(100vh-4rem)] bg-white duration-300 border-l ease-in-out flex`}
			>
				<div className="relative h-full w-full px-8">
					<div className="relative w-full h-[calc(100%-14rem)]"></div>
					<div className="relative w-full h-56 border-t">
						<div className="relative h-full w-full flex pt-8">
							<div className="relative h-auto w-full flex flex-col gap-4">
								<div className="relative flex uppercase items-center justify-between">
									<div className="relative text-gray-600 text-sm">
										SUBTOTAL:
									</div>
									<div className="relative font-bold text-gray-800">$999.9</div>
								</div>
								<div className="relative flex uppercase items-center justify-between">
									<div className="relative text-gray-600 text-sm">
										Shipping:{" "}
									</div>
									<div className="relative font-bold text-gray-800 text-sm">
										Free
									</div>
								</div>
								<div className="relative underline text-sm">Have a Coupon?</div>
								<div className="relative flex gap-4">
									<Link
										href="/cart"
										className="relative cursor-pointer rounded h-10 w-1/2 text-gray-800 bg-gray-200 flex items-center justify-center font-bold text-sm"
									>
										View In Detail
									</Link>
									<div className="relative cursor-pointer rounded h-10 w-1/2 bg-gray-800 text-gray-200 flex items-center justify-center font-bold text-sm">
										Check Out
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative h-full w-full flex justify-between items-center py-4 px-8 bg-white flex-wrap">
				<div className="relative flex gap-5 items-center">
					<Link href="/" className="relative flex items-center justify-center">
						<div className="relative text-sm font-bold font-sans">FP</div>
					</Link>
					<div className="relative h-3 w-[1px] bg-black"></div>
					<Link href="/shop" className="relative flex gap-3 items-center">
						<div className="relative h-auto text-sm font-bold capitalize">
							{"shop"}
						</div>
					</Link>
				</div>
				<div className="relative h-auto w-auto">
					<div className="relative h-auto w-auto flex gap-6 items-center">
						{pathName != "/search" && (
							<div
								onClick={() => {
									setShowSearching(!showSearching);
								}}
								className="relative h-auto w-auto flex items-center justify-center text-gray-700 hover:rotate-6 cursor-pointer rounded-full"
							>
								{!showSearching ? <Search size={20} /> : <XIcon size={20} />}
							</div>
						)}
						{pathName != "/cart" && (
							<div
								onClick={() => {
									setShowCartList(!showCartList);
								}}
								className="relative h-auto w-auto flex items-center justify-center text-gray-700 hover:rotate-6 cursor-pointer rounded-full"
							>
								{!showCartList ? (
									<ShoppingCart size={20} />
								) : (
									<XIcon size={20} />
								)}
							</div>
						)}
						<Link
							href="/account/profile"
							className="relative h-10 w-10 flex items-center justify-center text-gray-100 bg-gray-800 rounded-full"
						>
							<User size={20} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
