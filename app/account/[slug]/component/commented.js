import React from "react";

export default function Commented() {
	// User details stored separately
	const user = {
		id: 501,
		username: "JohnDoe123",
	};

	// Dummy comments data for the specific user
	const comments = [
		{
			id: 1,
			commentedOn: "Apple AirPods Pro",
			date: "2024-12-27",
			commentText: "Amazing sound quality! Totally worth the price.",
			likes: 120, // New likes field
		},
		{
			id: 2,
			commentedOn: "Samsung Galaxy Watch 6",
			date: "2024-12-26",
			commentText:
				"The fitness tracking is very accurate. Battery life could be better.",
			likes: 45, // New likes field
		},
		{
			id: 3,
			commentedOn: "Sony WH-1000XM5 Headphones",
			date: "2024-12-25",
			commentText:
				"The noise cancellation is top-notch. Perfect for traveling!",
			likes: 98, // New likes field
		},
		{
			id: 4,
			commentedOn: "Nike Air Max 270",
			date: "2024-12-24",
			commentText:
				"Super comfortable and stylish. A must-buy for sneaker lovers!",
			likes: 76, // New likes field
		},
		{
			id: 5,
			commentedOn: "Dell XPS 13 Laptop",
			date: "2024-12-23",
			commentText:
				"A powerhouse of a laptop for developers. Absolutely love it!",
			likes: 134, // New likes field
		},
	];

	return (
		<div className="relative h-auto w-full">
			<div className="relative h-auto w-full">
				<div className="relative text-sm font-bold pt-8 text-gray-700">
					Latest Comments by {user.username}
				</div>
				<div className="mt-4 grid gap-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1">
					{/* Rendering the comments */}
					{comments.map((comment) => (
						<div
							key={comment.id}
							className="flex flex-col col-span-1 space-y-2 py-4 border px-4 rounded-md"
						>
							<div className="text-xs text-gray-500">
								<div className="relative font-semibold">
									{comment.commentedOn}
								</div>
							</div>
							<div className="text-xs text-gray-500">Date: {comment.date}</div>
							<div className="text-xs text-gray-700 mt-1 font-bold">
								"{comment.commentText}"
							</div>
							<div className="text-xs text-gray-500 mt-1">
								Likes: {comment.likes}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
