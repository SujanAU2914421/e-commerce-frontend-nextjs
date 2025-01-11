import React from "react";

export default function CartList() {
	// Realistic dummy product list with provider name
	const products = [
		{
			id: 1,
			name: "Apple AirPods Pro",
			price: 249.0,
			image: "https://via.placeholder.com/100",
			description: "Active Noise Cancellation with immersive sound quality.",
			quantity: 2,
			rating: 5,
			providerName: "Apple Store",
		},
		{
			id: 2,
			name: "Samsung Galaxy Watch 6",
			price: 329.0,
			image: "https://via.placeholder.com/100",
			description: "Smartwatch with advanced fitness tracking and AMOLED display.",
			quantity: 1,
			rating: 4,
			providerName: "Samsung Official",
		},
		{
			id: 3,
			name: "Sony WH-1000XM5 Headphones",
			price: 399.0,
			image: "https://via.placeholder.com/100",
			description: "Industry-leading noise cancellation and crystal-clear audio.",
			quantity: 1,
			rating: 5,
			providerName: "Sony Electronics",
		},
		{
			id: 4,
			name: "Nike Air Max 270",
			price: 150.0,
			image: "https://via.placeholder.com/100",
			description: "Lightweight and comfortable sneakers with iconic design.",
			quantity: 3,
			rating: 4,
			providerName: "Nike Store",
		},
		{
			id: 5,
			name: "Dell XPS 13 Laptop",
			price: 999.0,
			image: "https://via.placeholder.com/100",
			description: "Compact laptop with high performance and stunning display.",
			quantity: 1,
			rating: 5,
			providerName: "Dell Store",
		},
	];

	return (
		<div className="relative h-auto w-full">
			<div className="relative h-auto w-full">
				<div className="relative h-auto flex justify-between items-center pt-8">
					<div className="relative h-auto flex items-center gap-2">
						<div className="relative text-sm font-bold text-gray-700">Total Items</div>
						<div className="relative">-</div>
						<div className="relative text-xl text-black font-bold">{products.length}</div>
					</div>
					<div className="relative">
						<div className="relative h-10 w-40 flex items-center justify-center text-sm font-bold bg-gray-800 text-white rounded-md">
							Check Out?
						</div>
					</div>
				</div>
				<div className="mt-8 grid -6">
					{/* Rendering the products */}
					{products.map((product) => (
						<div key={product.id} className="flex col-span-1 items-start border rounded-md h-56 pl-4">
							<div className="relative h-full w-40 py-4">
								<div className="relative h-40 w-40">
									<div
										className="relative h-full w-full rounded-md"
										style={{
											background: `url(${product.image})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
										}}
									></div>
								</div>
							</div>
							<div className="flex-1 w-[calc(100%-10rem)] px-4 py-4 grid gap-1">
								<div className="relative w-full flex items-center justify-between">
									<div className="relative">
										<div className="relative flex items-center gap-5">
											<div className="font-bold text-sm text-gray-600">{product.name}</div>
											<div className="relative flex items-center gap-2">
												<div className="font-bold text-sm text-gray-700">{product.quantity}</div>
												<div className="font-bold text-xs text-gray-600">x</div>
												<div className="font-bold text-sm text-gray-700">{product.price / product.quantity}</div>
												<div className="font-bold text-xs text-gray-600">-</div>

												<div className="text-normal text-gray-800 font-semibold">${product.price}</div>
											</div>
										</div>
									</div>
								</div>
								<div className="text-xs text-gray-700">{product.providerName}</div>
								<div className="text-xs text-gray-700">pieces: 2</div>
								<div className="mt-1 text-xs text-yellow-500">
									<span className="text-gray-500">Rating:</span> {"★".repeat(product.rating)}{" "}
									{"☆".repeat(5 - product.rating)}
								</div>
								<div className="text-xs text-gray-600 mt-1 w-5/6 truncate">{product.description}</div>
								<div className="relative h-auto w-auto pt-4">
									<div className="relative flex items-center gap-2">
										<div className="relative h-10 w-56 border border-red-300 text-red-500 hover:text-white hover:bg-red-500 hover:border-none cursor-pointer font-bold flex items-center justify-center rounded text-xs">
											Remove From Cart
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
