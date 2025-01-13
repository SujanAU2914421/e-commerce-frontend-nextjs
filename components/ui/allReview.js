import React, { useEffect, useState } from "react";
import RatingsStar from "./ratingsStar";
import { User } from "lucide-react/dist/cjs/lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { CommentForm } from "./addReviewField";
import CommentRatingsStar from "./commentRatingsStar";

export default function AllReview({ currentItemData }) {
	const { fetchAllComments, addComment, removeComment, updateComment, comments, setComments } =
		useUserInterractionContext();

	useEffect(() => {
		if (currentItemData) {
			// addComment(currentItemData.id, "Test Comment", 4, setComments);
			fetchAllComments(currentItemData.id, setComments);
		}
	}, [currentItemData]);
	useEffect(() => {
		console.log(comments);
	}, [comments]);

	const formatDate = (timestamp) => {
		const date = new Date(timestamp); // Create a Date object from the timestamp
		const year = date.getFullYear(); // Get the year
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based, so add 1) and pad with 0
		const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with 0
		return `${year}-${month}-${day}`; // Format as Y-M-D
	};
	const [sortOption, setSortOption] = useState("newest");

	// Sorting functions
	const sortByDateNewest = (a, b) => new Date(b.created_at) - new Date(a.created_at);
	const sortByDateOldest = (a, b) => new Date(a.created_at) - new Date(b.created_at);
	const sortByHighestRating = (a, b) => b.rating - a.rating;
	const sortByLowestRating = (a, b) => a.rating - b.rating;

	const [newComment, setNewComment] = useState(null);
	const [newRating, setNewRating] = useState(null);

	// Sort the reviews based on the selected sort option
	const sortedReviews = comments.sort((a, b) => {
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

	const [addingReview, setAddingReview] = useState(false);

	// Handle sorting button click
	const handleSortChange = (option) => {
		setSortOption(option);
	};

	return (
		<div className="relative pt-8 flex-col">
			<div className="relative flex gap-3 items-center">
				<RatingsStar currentProduct={currentItemData} size={20} />
				<div className="relative font-bold text-gray-800 text-[1rem]">
					{currentItemData["rating"] ? currentItemData["rating"] : 0}/5
				</div>
			</div>
			<div className="relative h-auto font-extrabold text-3xl font-sans w-4/5 pt-4">
				{currentItemData.comments.length} Reviews for {currentItemData.title}
			</div>
			<div className="relative text-sm font-medium underline pt-4">Review</div>
			<div className="relative w-full grid gap-10 pb-8 pt-4">
				<div className="relative flex items-center gap-4 text-sm">
					<div className="relative">Sort: </div>
					<div className="relative xl:flex lg:flex md:flex hidden items-center gap-4">
						<div
							className={`relative cursor-pointer ${sortOption === "newest" ? "text-black font-bold underline" : ""}`}
							onClick={() => handleSortChange("newest")}
						>
							Newest
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${sortOption === "oldest" ? "text-black font-bold underline" : ""}`}
							onClick={() => handleSortChange("oldest")}
						>
							Oldest
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${sortOption === "highest" ? "text-black font-bold underline" : ""}`}
							onClick={() => handleSortChange("highest")}
						>
							Highest ratings
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${sortOption === "lowest" ? "text-black font-bold underline" : ""}`}
							onClick={() => handleSortChange("lowest")}
						>
							Lowest ratings
						</div>
					</div>
					<div className="relative xl:hidden lg:hidden md:hidden">
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort By" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{/* <SelectLabel>Fruits</SelectLabel> */}
									<SelectItem
										className="relative text-xs text-gray-600 cursor-pointer hover:bg-gray-100"
										value="newest"
										onClick={() => handleSortChange("newest")}
									>
										Newest
									</SelectItem>
									<SelectItem
										className="relative text-xs text-gray-600 cursor-pointer hover:bg-gray-100"
										value="oldest"
										onClick={() => handleSortChange("oldest")}
									>
										Oldest
									</SelectItem>
									<SelectItem
										className="relative text-xs text-gray-600 cursor-pointer hover:bg-gray-100"
										value="highest-rating"
										onClick={() => handleSortChange("highest")}
									>
										Highest Rating
									</SelectItem>
									<SelectItem
										className="relative text-xs text-gray-600 cursor-pointer hover:bg-gray-100"
										value="lowest-rating"
										onClick={() => handleSortChange("lowest")}
									>
										Lowest Rating
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="relative w-full grid gap-3">
					{sortedReviews.map((review, index) => {
						return (
							<div key={index} className="relative h-auto w-full flex items-center gap-4">
								<div className="relative h-16 w-16 bg-gray-100 flex items-center justify-center text-gray-400">
									<User size={30} />
								</div>
								<div className="relative h-auto w-[calc(100%-4rem)] border p-4 grid gap-3">
									<div className="relative flex items-center gap-2">
										<CommentRatingsStar currentProduct={review} size={10} gap={0} color={"#ff4000"} />
										<div className="relative text-sm">{review.rating}/5</div>
									</div>
									<div className="relative text-xs uppercase font-sans">
										<span className="font-bold">{review.customer.username} </span>
										<span className="text-gray-400 italic">(verified owner) – {formatDate(review.created_at)}</span>
									</div>
									<div className="relative">{review.comment}</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="relative h-auto w-full">
				{!addingReview ? (
					<div className="relative h-full">
						<Button
							onClick={() => {
								setAddingReview(true);
							}}
							size={"sm"}
						>
							Add A Review
						</Button>
					</div>
				) : (
					<div className="relative px-2">
						<CommentForm currentItemData={currentItemData} setAddingReview={setAddingReview} />
					</div>
				)}
			</div>
		</div>
	);
}
