import { ShoppingBag, Trash } from "lucide-react/dist/cjs/lucide-react";
import React from "react";

export default function ToggleNotifier({
	showPopUp,
	addedOrRemoved,
	likeOrCart,
}) {
	return (
		<div
			className={`${
				showPopUp ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
			} fixed h-10 bottom-8 right-[calc(50%-5rem)] z-50 w-56 shadow-xl flex items-center ease-out duration-300 justify-center gap-4 ${
				addedOrRemoved
					? "bg-green-500 shadow-green-500"
					: "bg-red-500 shadow-red-500"
			} text-white`}
		>
			<div className="relative text-sm font-bold">
				{addedOrRemoved
					? `Added To ${likeOrCart === "like" ? "WishList" : "Cart"}`
					: `Removed From ${likeOrCart === "like" ? "WishList" : "Cart"}`}
			</div>
			<div className="relative">
				{addedOrRemoved ? (
					<ShoppingBag stroke="currentColor" size={18} />
				) : (
					<Trash stroke="currentColor" size={18} />
				)}
			</div>
		</div>
	);
}
