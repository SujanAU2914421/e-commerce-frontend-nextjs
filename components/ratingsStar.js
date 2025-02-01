import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import React, { useEffect, useState } from "react";

export default function RatingsStar({ currentProduct, size = 18, gap = 2, color = "red" }) {
	const { comments } = useUserInterractionContext();
	const [averageRating, setAverageRating] = useState(0);

	useEffect(() => {
		if (comments.length > 0) {
			const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
			const avgRating = totalRating / comments.length;
			setAverageRating(avgRating);
		}
	}, [comments]);
	return (
		<div className="flex items-center" style={{ gap: `${gap}px` }}>
			{Array.from({ length: 5 }, (_, index) => {
				// Calculate the fill percentage for each star
				const fillPercentage =
					averageRating > index ? (averageRating > index + 1 ? 100 : (averageRating - index) * 100) : 0;

				return (
					<div key={`rated-${index}`} style={{ color }}>
						<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<clipPath id={`clip-star-${index}-${currentProduct.created_at}`}>
									<rect x="0" y="0" width={`${(fillPercentage / 100) * 24}`} height="24" />
								</clipPath>
							</defs>
							<polygon
								points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
								fill="currentColor"
								clipPath={`url(#clip-star-${index}-${currentProduct.created_at})`}
							></polygon>
							<polygon
								points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							></polygon>
						</svg>
					</div>
				);
			})}
		</div>
	);
}
