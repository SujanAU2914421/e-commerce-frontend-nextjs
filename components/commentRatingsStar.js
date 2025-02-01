import React from "react";

export default function CommentRatingsStar({ currentProduct, size = 18, gap = 2, color = "red" }) {
	return (
		<div className="flex items-center" style={{ gap: `${gap}px` }}>
			{Array.from({ length: 5 }, (_, index) => {
				// Calculate the fill percentage for each star
				const fillPercentage =
					currentProduct?.rating > index
						? currentProduct?.rating > index + 1
							? 100
							: (currentProduct?.rating - index) * 100
						: 0;

				return (
					<div key={`rated-${index}`} style={{ color }}>
						<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<clipPath id={`clip-star-${index}-${currentProduct.id ? currentProduct.id : currentProduct.username}`}>
									<rect x="0" y="0" width={`${(fillPercentage / 100) * 24}`} height="24" />
								</clipPath>
							</defs>
							<polygon
								points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
								fill="currentColor"
								clipPath={`url(#clip-star-${index}-${currentProduct.id ? currentProduct.id : currentProduct.username})`}
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
