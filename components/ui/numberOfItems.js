import { Minus, Plus } from "lucide-react/dist/cjs/lucide-react";
import React, { useState } from "react";

export default function NumberOfItems({
	cartItems,
	currentItem,
	setCartItems,
	stock,
}) {
	const [selectedNumberItems, setSelectedNumberItems] = useState(
		currentItem.quantity
	);

	const updateCartItemQuantity = (newQuantity) => {
		setSelectedNumberItems(newQuantity);

		// Update the cartItems state with the new quantity
		const updatedCartItems = cartItems.map((item) =>
			item.productId === currentItem.productId
				? { ...item, quantity: newQuantity }
				: item
		);

		setCartItems(updatedCartItems);
	};

	return (
		<div className="relative flex">
			<div className="relative flex h-10 w-auto items-center divide-gray-200 border border-gray-200 rounded">
				<div
					onClick={() => {
						const newQuantity =
							selectedNumberItems >= 2 ? selectedNumberItems - 1 : 1;
						updateCartItemQuantity(newQuantity);
					}}
					className="relative h-full flex items-center justify-center text-gray-600 w-8 cursor-pointer"
				>
					<Minus size={18} stroke="currentColor" />
				</div>
				<div className="relative select-none h-1/2 w-auto px-2 flex items-center justify-center text-sm font-mono text-gray-700 font-bold border-x-[1px] border-gray-500">
					{selectedNumberItems}
				</div>
				<div
					onClick={() => {
						const newQuantity =
							selectedNumberItems < stock
								? selectedNumberItems + 1
								: selectedNumberItems;
						updateCartItemQuantity(newQuantity);
					}}
					className="relative h-full flex items-center justify-center text-gray-600 w-8 cursor-pointer"
				>
					<Plus size={18} stroke="currentColor" />
				</div>
			</div>
		</div>
	);
}
