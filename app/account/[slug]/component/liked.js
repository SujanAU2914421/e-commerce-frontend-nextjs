import React from "react";

export default function Liked() {
	// User details stored separately
	const user = {
		id: 501,
		username: "JohnDoe123",
	};

	// Dummy liked data for the specific user
	const likedData = [
		{
			id: 1,
			type: "item", // Indicates it's a product
			name: "Apple AirPods Pro",
			date: "2024-12-27",
			price: "$249.00",
			provider: "Apple Store",
			likes: 320, // New likes field
			image: "https://via.placeholder.com/100",
		},
		{
			id: 2,
			type: "comment", // Indicates it's a comment
			commentedOn: "Samsung Galaxy Watch 6",
			date: "2024-12-26",
			commentText: "The design is sleek and comfortable to wear!",
			likes: 210, // New likes field
		},
		{
			id: 3,
			type: "item", // Product
			name: "Sony WH-1000XM5 Headphones",
			date: "2024-12-25",
			price: "$399.99",
			provider: "Sony Electronics",
			likes: 430,
			image: "https://via.placeholder.com/100",
		},
		{
			id: 4,
			type: "comment", // Comment
			commentedOn: "Nike Air Max 270",
			date: "2024-12-24",
			commentText: "Super stylish and great for running!",
			likes: 290,
		},
	];

	return (
		<div className="relative h-auto w-full">
			<div className="relative h-auto w-full">
				<div className="relative text-sm font-bold pt-8 text-gray-700">
					Latest Likes by {user.username}
				</div>
				<div className="mt-4 grid gap-4 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1">
					{/* Rendering the liked items or comments */}
					{likedData.map((liked) => (
						<div
							key={liked.id}
							className="col-span-1 py-4 border px-4 rounded-md"
						>
							{liked.type === "item" ? (
								// If the liked type is a product
								<div className="relative grid gap-2">
									<div className="text-xs font-semibold text-gray-600">
										{liked.name}
									</div>
									<div className="text-xs text-gray-500 flex items-center">
										<div className="relative w-24">Provider</div>
										<div className="relative text-gray-500 font-medium">
											{liked.provider}
										</div>
									</div>
									<div className="text-xs text-gray-500 flex items-center">
										<div className="relative w-24">Price</div>
										<div className="relative text-gray-500 font-medium">
											{liked.price}
										</div>
									</div>
									<div className="text-xs text-gray-500 flex items-center">
										<div className="relative w-24">Date</div>
										<div className="relative text-gray-500 font-medium">
											{liked.date}
										</div>
									</div>
								</div>
							) : (
								// If the liked type is a comment
								<div className="relative grid gap-2">
									<div className="text-xs text-gray-600">
										<div className="relative font-semibold">
											Comment on: {liked.commentedOn}
										</div>
									</div>
									<div className="text-xs text-gray-500">
										Date: {liked.date}
									</div>
									<div className="text-xs text-gray-700 mt-1 font-bold">
										"{liked.commentText}"
									</div>
									<div className="text-xs text-gray-500 mt-1">
										Likes: {liked.likes}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
