import Link from "next/link";
import React, { useState } from "react";

export default function BrowseByCategory({ categories }) {
	// State to manage which categories are currently visible
	const [visibleCategories, setVisibleCategories] = useState(
		categories.slice(0, 6)
	);
	const [startIndex, setStartIndex] = useState(0);

	const handlePrev = () => {
		if (startIndex > 0) {
			setStartIndex(startIndex - 6);
			setVisibleCategories(categories.slice(startIndex - 6, startIndex));
		}
	};

	const handleNext = () => {
		if (startIndex + 6 < categories.length) {
			setStartIndex(startIndex + 6);
			setVisibleCategories(categories.slice(startIndex + 6, startIndex + 12));
		}
	};

	return (
		<div className="relative w-full grid gap-5 xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4">
			<div className="relative w-full flex items-center justify-between">
				<div className="relative grid gap-2">
					<div className="relative flex items-center gap-2">
						<div className="relative text-xs font-bold text-blue-400">
							Categories
						</div>
					</div>
					<div className="relative text-xl font-bold text-gray-800">
						Browse By Category
					</div>
				</div>
				<div className="relative flex items-end gap-2">
					<div
						className="relative h-10 w-10 flex rounded items-center justify-center text-gray-600 bg-gray-200 cursor-pointer"
						onClick={handlePrev}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="19" y1="12" x2="5" y2="12"></line>
							<polyline points="12 19 5 12 12 5"></polyline>
						</svg>
					</div>
					<div
						className="relative h-10 w-10 flex rounded items-center justify-center text-gray-600 bg-gray-200 cursor-pointer"
						onClick={handleNext}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="5" y1="12" x2="19" y2="12"></line>
							<polyline points="12 5 19 12 12 19"></polyline>
						</svg>
					</div>
				</div>
			</div>
			<div className="relative w-full h-auto flex">
				<div className="relative grid w-full gap-4 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
					{visibleCategories.map((category, index) => (
						<Link
							href={`/shop/${category.name}`}
							key={index}
							className="relative rounded-md bg-gray-200 select-none h-32 font-bold flex items-center justify-center"
						>
							<div className="text-center mt-2">{category.name}</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
