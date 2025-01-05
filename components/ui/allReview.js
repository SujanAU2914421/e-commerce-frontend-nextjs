import React, { useState } from "react";
import RatingsStar from "./ratingsStar";
import { User } from "lucide-react/dist/cjs/lucide-react";

export default function AllReview({ currentItemData }) {
	const formatDate = (timestamp) => {
		const date = new Date(timestamp); // Create a Date object from the timestamp
		const year = date.getFullYear(); // Get the year
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based, so add 1) and pad with 0
		const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0
		return `${year}-${month}-${day}`; // Format as Y-M-D
	};
	const [sortOption, setSortOption] = useState("newest");

	// Sorting functions
	const sortByDateNewest = (a, b) => b.date - a.date;
	const sortByDateOldest = (a, b) => a.date - b.date;
	const sortByHighestRating = (a, b) => b.rating - a.rating;
	const sortByLowestRating = (a, b) => a.rating - b.rating;

	// Sort the reviews based on the selected sort option
	const sortedReviews = currentItemData.reviews.sort((a, b) => {
		switch (sortOption) {
			case "newest":
				return sortByDateNewest(a, b);
			case "oldest":
				return sortByDateOldest(a, b);
			case "highest":
				return sortByHighestRating(a, b);
			case "lowest":
				return sortByLowestRating(a, b);
			default:
				return sortByDateNewest(a, b); // Default to "newest"
		}
	});

	// Handle sorting button click
	const handleSortChange = (option) => {
		setSortOption(option);
	};

	return (
		<div className="relative pt-8 grid gap-4">
			<div className="relative flex gap-3 items-center">
				<RatingsStar currentProduct={currentItemData} size={20} />
				<div className="relative font-bold text-gray-800 text-[1rem]">
					{currentItemData["rating"]}/5
				</div>
			</div>
			<div className="relative h-auto font-extrabold text-3xl font-sans w-4/5">
				{currentItemData.reviews.length} Reviews for {currentItemData.name}
			</div>
			<div className="relative text-sm font-medium underline">Review</div>
			<div className="relative w-full grid gap-10 pb-8">
				<div className="relative flex items-center gap-4 text-sm">
					<div className="relative">Sort: </div>
					<div className="relative flex items-center gap-4">
						<div
							className={`relative cursor-pointer ${
								sortOption === "newest" ? "text-black font-bold underline" : ""
							}`}
							onClick={() => handleSortChange("newest")}
						>
							Newest
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${
								sortOption === "oldest" ? "text-black font-bold underline" : ""
							}`}
							onClick={() => handleSortChange("oldest")}
						>
							Oldest
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${
								sortOption === "highest" ? "text-black font-bold underline" : ""
							}`}
							onClick={() => handleSortChange("highest")}
						>
							Highest ratings
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${
								sortOption === "lowest" ? "text-black font-bold underline" : ""
							}`}
							onClick={() => handleSortChange("lowest")}
						>
							Lowest ratings
						</div>
					</div>
				</div>
				<div className="relative w-full grid gap-3">
					{sortedReviews.map((review, index) => {
						return (
							<div
								key={index}
								className="relative h-auto w-full flex items-center gap-4"
							>
								<div className="relative h-16 w-16 bg-gray-100 flex items-center justify-center text-gray-400">
									<User size={30} />
								</div>
								<div className="relative h-auto w-[calc(100%-4rem)] border p-4 grid gap-3">
									<div className="relative flex items-center gap-2">
										<RatingsStar
											currentProduct={review}
											size={10}
											gap={0}
											color={"#ff4000"}
										/>
										<div className="relative text-sm">{review.rating}/5</div>
									</div>
									<div className="relative text-xs uppercase font-sans">
										<span className="font-bold">{review.username} </span>
										<span className="text-gray-400 italic">
											(verified owner) – {formatDate(review.date)}
										</span>
									</div>
									<div className="relative">{review.comment}</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
