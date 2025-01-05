"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react/dist/cjs/lucide-react";
import ExploreProducts from "@/components/ui/exploreProducts";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";

export default function Contents({
	categories,
	shopCurrentCategory,
	setShopCurrentCategory,
	allProducts,
	currentQuickViewProduct,
	setCurrentQuickViewProduct,
	currentItemData,
}) {
	const pathname = usePathname(); // Get the current pathname
	const pathCategory = pathname.split("/")[2]; // Get the category from the path after '/shop'

	// Filter the data based on the selected category
	const filteredData = allProducts.filter(
		(item) =>
			shopCurrentCategory === "all" || item.category === shopCurrentCategory
	);

	// Set category as active or not
	const isActive = (category) =>
		shopCurrentCategory === category ? "font-bold text-black" : ""; // Check if the category is active

	useEffect(() => {
		// Check if pathCategory exists, if not default to "all"
		if (pathCategory) {
			setShopCurrentCategory(pathCategory);
		} else {
			setShopCurrentCategory("all");
		}
	}, [pathname, setShopCurrentCategory, pathCategory]); // Depend on pathname and pathCategory

	return (
		<div className="relative h-auto w-full pt-4 grid gap-10">
			<div className="relative h-auto w-full pt-4 grid gap-4">
				{
					// If quickViewPopUp is true, render the QuickViewPopUp component
					currentQuickViewProduct != null && currentQuickViewProduct != [] && (
						<QuickViewPopUp
							filteredData={filteredData}
							currentQuickViewProduct={currentQuickViewProduct}
							setCurrentQuickViewProduct={setCurrentQuickViewProduct}
							currentItemData={currentItemData}
						/>
					)
				}
				<div
					className="relative h-auto w-full flex gap-2 items-center"
					style={{ fontFamily: "afacad-flux" }}
				>
					<div className="relative font-medium text-gray-800">Home</div>
					<div className="relative text-gray-500">
						<ChevronRight size={14} />
					</div>
					<div className="relative font-medium text-gray-500">
						{shopCurrentCategory}
					</div>
				</div>
				<div className="relative flex items-center justify-between flex-wrap gap-y-8">
					<div className="relative h-auto w-auto">
						<div className="relative h-auto w-auto flex gap-6 text-[0.8rem] text-gray-500 flex-wrap">
							<Link
								href={`/shop/all`}
								className={`relative cursor-pointer group ${isActive("all")}`}
							>
								<div className="relative capitalize group-hover:text-black">
									All
								</div>
								<div
									className={`absolute -bottom-1 ${
										isActive("all") ? "w-3/4" : "w-0 group-hover:w-3/4"
									} bg-gray-800 h-[2px] duration-300 rounded-full`}
								></div>
							</Link>
							{categories?.slice(0, 7).map((category, index) => (
								<Link
									key={index}
									href={`/shop/${category["name"]}`}
									className={`relative cursor-pointer group ${isActive(
										category["name"]
									)}`}
								>
									<div className="relative uppercase group-hover:text-black">
										{category["name"]}
									</div>
									<div
										className={`absolute -bottom-1 ${
											isActive(category["name"])
												? "w-3/4"
												: "w-0 group-hover:w-3/4"
										} bg-gray-800 h-[2px] duration-300 rounded-full`}
									></div>
								</Link>
							))}
						</div>
					</div>

					{/* Search Bar */}
					<div className="relative">
						<div className="relative h-auto w-auto">
							<div className="relative h-auto w-auto flex gap-4">
								<div className="relative flex max-w-80 h-10 items-center border overflow-hidden rounded-md">
									<div className="relative h-full w-full">
										<input
											type="text"
											className="relative h-full w-full outline-none border-none text-sm px-4"
											placeholder="Search"
										/>
									</div>
									<div className="relative px-4">
										<svg
											width="17"
											height="17"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<circle cx="11" cy="11" r="8"></circle>
											<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{filteredData.length === 0 ? (
				<div className="text-lg font-bold text-gray-600 pt-4">
					Ops, no products available
				</div>
			) : (
				<ExploreProducts
					allProducts={filteredData}
					setCurrentQuickViewProduct={setCurrentQuickViewProduct}
				/>
			)}
		</div>
	);
}
