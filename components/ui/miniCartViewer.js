import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import Link from "next/link";
import React from "react";

export const MiniCartViewer = () => {
	const { cartItems } = useUserInterractionContext();

	// Calculate the subtotal based on cart items' prices
	const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

	return (
		<div className="relative h-full w-full px-8">
			<div className="relative w-full h-[calc(100%-14rem)] overflow-y-auto">
				{/* Display the list of products in the cart */}
				<div className="relative w-full h-auto">
					{cartItems.length > 0 ? (
						cartItems.map((item, index) => {
							return (
								<div key={index} className="relative flex items-center justify-between py-2">
									<div className="flex items-center gap-2">
										{/* Product Image */}
										<div className="w-12 h-12 object-cover bg-black"></div>
										<div>
											{/* Product Name */}
											<div className="text-sm font-medium text-gray-800">{item.product.name}</div>
											{/* Product Price */}
											<div className="text-xs text-gray-600">
												${item.product.price} x {item.quantity}
											</div>
										</div>
									</div>
									{/* Product Total Price */}
									<div className="font-bold text-gray-800">${(item.product.price * item.quantity).toFixed(2)}</div>
								</div>
							);
						})
					) : (
						<div className="text-center text-gray-600">Your cart is empty.</div>
					)}
				</div>
			</div>
			<div className="relative w-full h-56 border-t">
				<div className="relative h-full w-full flex pt-8">
					<div className="relative h-auto w-full flex flex-col gap-4">
						{/* Subtotal */}
						<div className="relative flex uppercase items-center justify-between">
							<div className="relative text-gray-600 text-sm">SUBTOTAL:</div>
							<div className="relative font-bold text-gray-800">${subtotal.toFixed(2)}</div>
						</div>
						{/* Shipping */}
						<div className="relative flex uppercase items-center justify-between">
							<div className="relative text-gray-600 text-sm">Shipping:</div>
							<div className="relative font-bold text-gray-800 text-sm">Free</div>
						</div>
						{/* Coupon */}
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
	);
};
