"use client";
import Login from "@/app/auth/login/page";
import { useAuthContext } from "@/contexts/AuthContext";
import { Search, User } from "lucide-react";
import { XIcon } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function LandingPageNavbar() {
	const pathname = usePathname();

	const { user, showLoginPopUp, setShowLoginPopUp } = useAuthContext();

	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);

	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				setShowLoginPopUp(false);
			}
		});
		return () => {
			window.removeEventListener("keydown", (e) => {
				if (e.key === "Escape") {
					setShowLoginPopUp(false);
				}
			});
		};
	}, []);

	return (
		<div
			className="relative h-full w-full flex justify-between items-center xl:px-0 lg:px-0 md:px-0 px-4 py-4"
			onMouseMove={(e) => {
				setPosX(e.clientX);
				setPosY(e.clientY);
			}}
		>
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
			<div className="relative flex">
				<Link href={"/"} className="relative font-bold text-xl font-sans">
					FP
				</Link>
			</div>
			<div className="relative flex items-center gap-8">
				<div className="relative h-auto w-auto flex gap-8 text-sm text-gray-700 items-center uppercase">
					{/* Home Menu Item */}
					<Link href="/shop/all" className="relative group">
						<div
							className={`relative cursor-pointer ${
								pathname === "/shop"
									? "text-black font-bold"
									: "text-gray-700 group-hover:text-gray-700 group-hover:font-bold"
							}`}
						>
							Shop
						</div>
						<div
							className={`absolute -bottom-1 ${
								pathname === "/shop" ? "w-1/2" : "w-0 group-hover:w-1/2"
							} duration-300 h-[2px] rounded-full bg-gray-600`}
						></div>
					</Link>

					{/* Blog Menu Item */}
					<Link href="/about#services" className="relative group">
						<div
							className={`relative cursor-pointer ${
								pathname === "/services"
									? "text-black font-bold"
									: "text-gray-700 group-hover:text-gray-700 group-hover:font-bold"
							}`}
						>
							Services
						</div>
						<div
							className={`absolute -bottom-1 ${
								pathname === "/services" ? "w-1/2" : "w-0 group-hover:w-1/2"
							} duration-300 h-[2px] rounded-full bg-gray-600`}
						></div>
					</Link>

					{/* About Us Menu Item */}
					<Link href="/about" className="relative group">
						<div
							className={`relative cursor-pointer ${
								pathname === "/about"
									? "text-black font-bold"
									: "text-gray-700 group-hover:text-gray-700 group-hover:font-bold"
							}`}
						>
							About us
						</div>
						<div
							className={`absolute -bottom-1 ${
								pathname === "/about" ? "w-1/2" : "w-0 group-hover:w-1/2"
							} duration-300 h-[2px] rounded-full bg-gray-600`}
						></div>
					</Link>
				</div>
			</div>
			<div className="relative flex items-center gap-4">
				<Link href="/search" className="relative h-auto w-auto">
					<Search size={16} />
				</Link>
				{!user && (
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
	);
}
