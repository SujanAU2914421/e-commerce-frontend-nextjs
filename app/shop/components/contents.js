"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react/dist/cjs/lucide-react";
import ExploreProducts from "@/components/ui/exploreProducts";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMainContext } from "@/contexts/MainContext";

export default function Contents() {
	const {
		categories,
		shopCurrentCategory,
		currentQuickViewProduct,
		setCurrentQuickViewProduct,
		setShopCurrentCategory,
		getProducts,
		allProducts,
		loadingProducts,
		setLoadingProducts,
		fetchProductsBy,
		setFetchProductsBy,
		searchPagination,
		setSearchPagination,
	} = useMainContext();

	const pathname = usePathname(); // Get the current pathname
	const pathCategory = pathname.split("/")[2]; // Get the category from the path after '/shop'
	const [visibleCategories, setVisibleCategories] = useState(null);

	// Set category as active or not
	const isActive = (category) => (shopCurrentCategory === category ? "font-bold text-black" : ""); // Check if the category is active

	useEffect(() => {
		setVisibleCategories(categories?.slice(0, 6));
	}, [categories]);

	useEffect(() => {
		// Check if pathCategory exists, if not default to "all"
		if (pathCategory) {
			setShopCurrentCategory(pathCategory);
		}
	}, [pathname, setShopCurrentCategory, pathCategory]); // Depend on pathname and pathCategory

	return (
		<div className="relative h-auto w-full pt-4 flex-col space-y-4">
			<div className="relative h-auto w-full pt-4 grid gap-4">
				<QuickViewPopUp filteredData={allProducts} />
				<div className="relative flex items-center justify-between flex-wrap gap-y-8">
					<div className="relative h-auto w-auto">
						<div className="relative h-auto w-auto flex gap-6 text-[0.8rem] text-gray-500 flex-wrap">
							<Link href={`/shop/all`} className={`relative cursor-pointer group ${isActive("all")}`}>
								<div className="relative capitalize group-hover:text-black">All</div>
								<div
									className={`absolute -bottom-1 ${
										isActive("all") ? "w-3/4" : "w-0 group-hover:w-3/4"
									} bg-gray-800 h-[2px] duration-300 rounded-full`}
								></div>
							</Link>
							{visibleCategories?.slice(0, 7).map((category, index) => (
								<Link
									key={index}
									href={`/shop/${category.slug}`}
									className={`relative cursor-pointer group ${isActive(category.slug)}`}
								>
									<div className="relative uppercase group-hover:font-bold group-hover:text-black">
										{category.title}
									</div>{" "}
									{/* Assuming 'title' is the correct property */}
									<div
										className={`absolute -bottom-1 ${
											isActive(category.slug) ? "w-3/4" : "w-0 group-hover:w-3/4"
										} bg-gray-800 h-[2px] duration-300 rounded-full`}
									></div>
								</Link>
							))}
						</div>
					</div>
					<div className="relative h-auto w-auto flex gap-4 uppercase text-sm text-gray-700">
						<Select
							onValueChange={(value) => {
								setFetchProductsBy(value);
							}}
							defaultValue={fetchProductsBy ? fetchProductsBy : "latest"}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Order By" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="latest">Latest</SelectItem>
								<SelectItem value="oldest">Oldest</SelectItem>
								<SelectItem value="loved">Loved</SelectItem>
								<SelectItem value="popular">Popular</SelectItem>
								<SelectItem value="expensive">Expensize</SelectItem>
								<SelectItem value="cost-efficient">Cost Efficient</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="relative h-auto w-full justify-between pt-8">
					<div className="relative text-gray-700">Showing Results</div>
					{searchPagination && (
						<div className="relative flex h-auto w-auto gap-2">
							{Array.from({ length: searchPagination.total_pages }, (_, i) => i + 1)
								.slice(0, 3) // Show the first 3 pages
								.map((page) => (
									<div
										key={page}
										onClick={() => {
											setPageNum(page); // Directly set the page number
										}}
										className={`relative cursor-pointer h-8 w-8 flex items-center justify-center text-xs font-bold rounded-sm ${
											page === searchPagination.current_page ? "bg-gray-800 text-white" : "bg-gray-200"
										}`}
									>
										{page}
									</div>
								))}

							{searchPagination.total_pages > 5 && searchPagination.has_more_pages && (
								<>
									<div className="relative cursor-pointer h-8 w-8 flex items-end justify-center text-xs font-bold">
										...
									</div>
									<div
										onClick={() => {
											setPageNum(searchPagination.total_pages);
										}}
										className={`relative cursor-pointer h-8 w-8 flex items-center justify-center text-xs font-bold bg-gray-200 rounded-sm`}
									>
										{searchPagination.total_pages}
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
			{allProducts?.length === 0 ? (
				<div className="text-lg font-bold text-gray-600 pt-4">Ops, no products available</div>
			) : (
				<ExploreProducts allProducts={allProducts} setCurrentQuickViewProduct={setCurrentQuickViewProduct} />
			)}
		</div>
	);
}
