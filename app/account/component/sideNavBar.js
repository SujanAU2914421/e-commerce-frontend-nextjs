import {
	Activity,
	ChevronLeft,
	ShoppingBag,
	ShoppingCart,
} from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideNavBar() {
	const pathname = usePathname(); // Get the current pathname
	const isactive = (path) => {
		const pathSegment = pathname.split("/")[2] || ""; // Ensure it's never undefined
		return (pathSegment === "" && path === "profile") || pathSegment === path
			? "bg-gray-700 text-white"
			: "hover:bg-gray-200";
	};

	return (
		<div className="relative h-auto w-full afacad-flux grid gap-8">
			<div className="relative grid gap-2">
				<div className="relative flex gap-5 items-center px-4 pt-5">
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
				<div className="relative">
					<div className="relative h-auto w-auto flex">
						<Link
							href="/shop"
							className="relative h-auto w-auto flex text-sm items-center gap-3 capitalize text-gray-500 font-medium px-4 pt-4"
						>
							<div className="relative text-gray-800">
								<ChevronLeft size={18} />
							</div>
							<div className="relative font-bold text-gray-800">Go Back</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="relative grid gap-4 text-sm text-gray-700">
				<Link
					href={"/shop"}
					className={`relative h-10 w-full rounded bg-gray-200 flex items-center px-5 gap-4 cursor-pointer`}
				>
					<div className="relative h-auto w-auto">
						<ShoppingCart size={20} />
					</div>
					<div className="relative h-auto w-auto">Go Back Shopping</div>
				</Link>
				<div className="relative grid gap-2 text-sm">
					<Link
						href={"/account/activity"}
						className={`${isactive(
							"activity"
						)} relative h-10 w-full rounded flex items-center px-5 gap-4 cursor-pointer`}
					>
						<div className="relative h-auto w-auto">
							<Activity size={18} />
						</div>
						<div className="relative h-auto w-auto">Activity</div>
					</Link>
					<Link
						href={"/account/cart"}
						className={`${isactive(
							"cart"
						)} relative h-10 w-full rounded flex items-center px-5 gap-4 cursor-pointer`}
					>
						<div className="relative h-auto w-auto">
							<ShoppingCart size={20} />
						</div>
						<div className="relative h-auto w-auto">Cart</div>
					</Link>
					<Link
						href={"/account/purchase-details"}
						className={`${isactive(
							"purchase-details"
						)} relative h-10 w-full rounded flex items-center px-5 gap-4 cursor-pointer`}
					>
						<div className="relative h-auto w-auto">
							<svg
								width="17"
								height="17"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="1" y="3" width="15" height="13"></rect>
								<polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
								<circle cx="5.5" cy="18.5" r="2.5"></circle>
								<circle cx="18.5" cy="18.5" r="2.5"></circle>
							</svg>
						</div>
						<div className="relative h-auto w-auto">Purchase details</div>
					</Link>
					<Link
						href={"/account/profile"}
						className={`${isactive(
							"profile"
						)} relative h-10 w-full rounded flex items-center px-5 gap-4 cursor-pointer`}
					>
						<div className="relative h-auto w-auto">
							<svg
								width="17"
								height="17"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
						</div>
						<div className="relative h-auto w-auto">Account Details</div>
					</Link>
					<Link
						href={"/account/settings"}
						className={`${isactive(
							"settings"
						)} relative h-10 w-full rounded flex items-center px-5 gap-4 cursor-pointer`}
					>
						<div className="relative h-auto w-auto">
							<svg
								width="17"
								height="17"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="3"></circle>
								<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
							</svg>
						</div>
						<div className="relative h-auto w-auto">Account settings</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
