import React, { useEffect, useState } from "react";
import RatingsStar from "./ratingsStar";
import { User } from "lucide-react/dist/cjs/lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { CommentForm } from "./addReviewField";
import CommentRatingsStar from "./commentRatingsStar";
import { useAuthContext } from "@/contexts/AuthContext";
import { X } from "lucide-react";

export default function AllReview({ currentItemData }) {
	const { user } = useAuthContext();

	const {
		fetchAllComments,
		addComment,
		removeComment,
		comments,
		setComments,
	} = useUserInterractionContext();

	useEffect(() => {
		if (currentItemData) {
			fetchAllComments(currentItemData.id, setComments);
		}
	}, [currentItemData]);

	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const [sortOption, setSortOption] = useState("newest");

	// Sorting functions
	const sortByDateNewest = (a, b) =>
		new Date(b.created_at) - new Date(a.created_at);
	const sortByDateOldest = (a, b) =>
		new Date(a.created_at) - new Date(b.created_at);
	const sortByHighestRating = (a, b) => b.rating - a.rating;
	const sortByLowestRating = (a, b) => a.rating - b.rating;

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
				return sortByDateNewest(a, b);
		}
	});

	const [addingReview, setAddingReview] = useState(false);

	const handleSortChange = (option) => {
		setSortOption(option);
	};

	// Check if the current user has already commented
	const userComment = user
		? comments.find((review) => review.customer_id === user.id)
		: null;

	useEffect(() => {
		console.log(user, comments);
	}, [user, comments]);

	return (
		<div className="relative pt-8 flex-col">
			<div className="relative flex gap-3 items-center">
				<RatingsStar currentProduct={currentItemData} size={20} />
				<div className="relative font-bold text-gray-800 text-[1rem]">
					{currentItemData["rating"] ? currentItemData["rating"] : 0}
					/5
				</div>
			</div>
			<div className="relative h-auto font-extrabold text-3xl font-sans w-4/5 pt-4">
				{currentItemData.comments.length} Reviews for{" "}
				{currentItemData.title}
			</div>
			<div className="relative text-sm font-medium underline pt-4">
				Review
			</div>
			<div className="relative w-full grid gap-10 pb-8 pt-4">
				<div className="relative flex items-center gap-4 text-sm">
					<div className="relative">Sort: </div>
					<div className="relative xl:flex lg:flex md:flex hidden items-center gap-4">
						<div
							className={`relative cursor-pointer ${
								sortOption === "newest"
									? "text-black font-bold underline"
									: ""
							}`}
							onClick={() => handleSortChange("newest")}
						>
							Newest
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${
								sortOption === "oldest"
									? "text-black font-bold underline"
									: ""
							}`}
							onClick={() => handleSortChange("oldest")}
						>
							Oldest
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${
								sortOption === "highest"
									? "text-black font-bold underline"
									: ""
							}`}
							onClick={() => handleSortChange("highest")}
						>
							Highest ratings
						</div>
						<div className="relative">/</div>
						<div
							className={`relative cursor-pointer ${
								sortOption === "lowest"
									? "text-black font-bold underline"
									: ""
							}`}
							onClick={() => handleSortChange("lowest")}
						>
							Lowest ratings
						</div>
					</div>
				</div>
				<div className="relative w-full grid gap-3">
					{sortedReviews.map((review, index) => (
						<div
							key={index}
							className="relative h-auto w-full flex items-center gap-4"
						>
							<div className="relative h-16 w-16 bg-gray-100 flex items-center justify-center text-gray-400">
								{review.customer.gender === "female" ? (
									<svg
										fill="currentColor"
										width="30"
										height="30"
										viewBox="0 0 24 24"
									>
										<path d="M21,20v2a1,1,0,0,1-2,0V20a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v2a1,1,0,0,1-2,0V20a5.006,5.006,0,0,1,5-5h8A5.006,5.006,0,0,1,21,20Zm-9-7a9.735,9.735,0,0,1-6.707-2.293,1,1,0,0,1,.26-1.6C6.945,8.409,7,6.021,7,6A5,5,0,0,1,17,6c0,.052.063,2.416,1.447,3.108a1,1,0,0,1,.26,1.6A9.735,9.735,0,0,1,12,13ZM7.649,9.953A8.816,8.816,0,0,0,12,11a8.815,8.815,0,0,0,4.351-1.047A6.716,6.716,0,0,1,15,6,3,3,0,0,0,9,6,6.716,6.716,0,0,1,7.649,9.953Z" />
									</svg>
								) : (
									<User size={30} />
								)}
							</div>
							<div className="relative h-auto w-[calc(100%-4rem)] border flex">
								<div className="relative w-[calc(100%-4rem)] flex-col space-y-3 p-4">
									<div className="relative flex items-center gap-2">
										<CommentRatingsStar
											currentProduct={review}
											size={10}
											gap={0}
											color={"#ff4000"}
										/>
										<div className="relative text-sm">
											{review.rating}/5
										</div>
									</div>
									<div className="relative text-xs uppercase font-sans">
										<span className="font-bold">
											{review.customer.username}{" "}
										</span>
										<span className="text-gray-400 italic">
											(verified owner) –{" "}
											{formatDate(review.created_at)}
										</span>
									</div>
									<div className="relative">
										{review.comment}
									</div>
								</div>
								<div className="relative h-auto w-16">
									{user && review.customer_id === user.id && (
										<div className="relative h-16 w-16 flex items-center justify-center">
											<div
												onClick={() => {
													removeComment(
														currentItemData.id,
														review.id,
														setComments
													);
												}}
												className="relative"
											>
												<X size={16} />
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="relative h-auto w-full">
				{user &&
					!userComment &&
					(!addingReview ? (
						<Button
							onClick={() => setAddingReview(true)}
							size={"sm"}
						>
							Add A Review
						</Button>
					) : (
						<div className="relative px-2">
							<CommentForm
								currentItemData={currentItemData}
								setAddingReview={setAddingReview}
							/>
						</div>
					))}
			</div>
		</div>
	);
}
