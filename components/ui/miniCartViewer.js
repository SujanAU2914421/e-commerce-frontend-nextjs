import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import Link from "next/link";
import React from "react";

export const MiniCartViewer = () => {
	const { cartItems, togglingCart, setTogglingCart, togglingWishList, setTogglingWishList } =
		useUserInterractionContext();

	// Calculate the subtotal based on cart items' prices
	const subtotal =
		cartItems && cartItems.length > 0
			? cartItems.reduce(
					(total, item) =>
						total + (item.product.price - (item.product.discount * item.product.price) / 100) * item.quantity,
					0
			  )
			: 0;

	return (
		<div className="relative h-full w-full">
			<div className="relative w-full h-[calc(100%-14rem)] overflow-y-auto">
				{/* Display the list of products in the cart */}
				<div className="relative w-full h-auto pt-8">
					{cartItems.length > 0 ? (
						cartItems.map((item, index) => {
							return (
								<Link
									href={`/shop/${item.product.category.slug}/${item.product.id}`}
									key={index}
									className="relative flex items-center justify-between py-2 hover:bg-gray-100 px-8 cursor-pointer"
								>
									<div className="flex items-center gap-2">
										{/* Product Image */}
										<div className="w-12 h-12 object-cover bg-gray-100 rounded">
											{item.product.colors.map((elem, ind) => {
												if (item.color === item.product.colors[ind].name) {
													return (
														<div
															key={ind}
															className="relative h-full w-full rounded border"
															style={{
																background: `url(${item.product.colors[ind].images[0]}) center / contain no-repeat`,
															}}
														></div>
													);
												} else {
													return null;
												}
											})}
										</div>
										<div>
											{/* Product Name */}
											<div className="text-sm font-bold font-sans text-gray-800">{item.product.title}</div>
											{/* Product Price */}
											<div className="relative flex gap-4 items-center">
												<div className="text-xs text-gray-600 flex items-center gap-2">
													<div className="relative">
														${(item.product.price - (item.product.discount * item.product.price) / 100).toFixed(2)}
													</div>
													<div className="relative">x</div>
													<div className="relative font-bold text-sm">{item.quantity}</div>
												</div>
												<div className="relative h-[2px] w-3 bg-gray-400"></div>
												<div className="text-sm font-bold text-gray-600">{item.size}</div>
												<div className="relative h-[2px] w-1 bg-gray-400"></div>
												<div className="text-xs text-gray-600 font-bold">{item.color}</div>
											</div>
										</div>
									</div>
									{/* Product Total Price */}
									<div className="font-bold text-gray-800">
										<div className="relative font-bold text-gray-800">
											<span className="text-sm">
												$
												{Math.floor(
													(item.product.price - (item.product.discount * item.product.price) / 100) * item.quantity
												)}
											</span>
											<span className="text-xs">
												.
												{
													(
														((item.product.price - (item.product.discount * item.product.price) / 100) *
															item.quantity) %
														1
													)
														.toFixed(2)
														.split(".")[1]
												}
											</span>
										</div>
									</div>
								</Link>
							);
						})
					) : (
						<div className="text-center text-gray-600">Your cart is empty.</div>
					)}
				</div>
			</div>
			<div className="relative w-full h-56 border-t px-8">
				<div className="relative h-full w-full flex pt-8">
					<div className="relative h-auto w-full flex flex-col gap-4">
						{/* Subtotal */}
						<div className="relative flex uppercase items-center justify-between">
							<div className="relative text-gray-600 text-sm">SUBTOTAL:</div>
							<div className="relative font-bold text-gray-800">
								<span className="text-xl">${Math.floor(subtotal)}</span>
								<span className="text-sm">.{(subtotal % 1).toFixed(2).split(".")[1]}</span>
							</div>
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
