import { useState } from "react";
import { Button } from "./ui/button";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";

export const CommentForm = ({ currentItemData, setAddingReview }) => {
	const { addComment, setComments } = useUserInterractionContext();

	const [commentText, setCommentText] = useState("");
	const [rating, setRating] = useState(0); // Default rating (0 means no rating selected)

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Call the addComment function
		await addComment(currentItemData.id, commentText, rating, setComments);

		// Clear the form after submission
		setAddingReview(false);
		setCommentText("");
		setRating(0);
	};

	// Check if the form is ready to submit
	const isFormReady = commentText.trim() !== "" && rating > 0;

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-sm flex flex-col gap-4"
		>
			<div className="flex flex-col gap-2">
				{/* Comment Input */}
				<input
					type="text"
					placeholder="Write a Comment"
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none"
				/>
				{/* Rating Selector */}
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">Rating:</span>
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							onClick={() => setRating(star)}
							className={`text-xl ${
								rating >= star
									? "text-yellow-500"
									: "text-gray-400"
							}`}
						>
							★
						</button>
					))}
				</div>
			</div>
			{/* Submit Button */}
			<Button
				type="submit"
				className={`px-4 py-2 rounded-md ${
					isFormReady
						? "bg-gray-800 text-white"
						: "bg-gray-500 text-gray-300 cursor-not-allowed"
				}`}
				disabled={!isFormReady}
			>
				Submit
			</Button>
		</form>
	);
};
