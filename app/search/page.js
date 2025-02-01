"use client";
import { Button } from "@/components/ui/button";
import ExploreProducts from "@/components/exploreProducts";
import Footer from "@/components/footer";
import ShopNavbar from "@/components/navbar";
import QuickViewPopUp from "@/components/quickViewPopUp";
import { useMainContext } from "@/contexts/MainContext";
import { Loader } from "lucide-react";
import { ChevronLeft } from "lucide-react/dist/cjs/lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useCallback, useState } from "react";

export default function SearchPageUi() {
	const {
		searchQuery,
		setSearchQuery,
		searchProducts,
		searchPagination,
		searchProductsResult,
		loadingSearchData,
	} = useMainContext();
	const searchParams = useSearchParams();
	const router = useRouter();
	const inputRef = useRef(null);
	const [pageNum, setPageNum] = useState(1);

	// Memoize searchProducts to avoid triggering unnecessary renders
	const handleSearchProducts = useCallback(
		(query, page) => {
			setSearchQuery(query);
			searchProducts(query, "", page);
		},
		[setSearchQuery, searchProducts]
	);

	const searchHandler = () => {
		const query = inputRef.current?.value.trim(); // Get the value from the input ref
		if (query && query !== "") {
			handleSearchProducts(query, pageNum); // Use the memoized function with the current page number
			const params = new URLSearchParams();
			params.set("query", query);
			router.replace(`/search?${params.toString()}`); // Update the query string
		}
	};

	const searchSubmitHandler = (e) => {
		e.preventDefault(); // Prevent page refresh on form submit
		searchHandler();
	};

	useEffect(() => {
		searchHandler(); // Perform search when pageNum changes
	}, [pageNum]);

	useEffect(() => {
		const queryTemp = searchParams.get("query") || "";
		if (queryTemp.length > 0 && queryTemp !== searchQuery) {
			handleSearchProducts(queryTemp, pageNum); // Ensure correct page is used when query changes
		}
	}, [searchParams, searchQuery, handleSearchProducts, pageNum]);

	const handleGoBack = () => {
		router.back();
	};

	return (
		<div
			className="relative h-screen w-screen overflow-x-hidden pb-16"
			style={{ fontFamily: "afacad-flux" }}
		>
			<div className="sticky top-0 left-0 z-40">
				<ShopNavbar />
			</div>
			<div className="relative h-auto w-full bg-white flex justify-center pt-8 pb-4">
				<QuickViewPopUp filteredData={searchProductsResult} />
				<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
					<div className="relative flex flex-col gap-8">
						<div className="relative flex">
							<div
								onClick={handleGoBack}
								className="relative text-sm text-gray-700 flex items-center gap-4 hover:text-gray-700 hover:font-bold cursor-pointer"
							>
								<ChevronLeft size={14} />
								<div className="relative">Go Back</div>
							</div>
						</div>
						<div className="relative flex flex-col gap-4">
							<div className="relative text-sm text-gray-700">
								Search for your favorite clothing items.
							</div>
							{/* Search input wrapped in a form */}
							<form
								className="relative w-full h-auto flex items-center gap-4"
								onSubmit={searchSubmitHandler}
							>
								<div className="relative h-auto w-full">
									<input
										type="text"
										ref={inputRef}
										defaultValue={searchQuery} // Set initial value from the current searchQuery
										className="relative h-9 w-full outline-1 outline-gray-300 border-gray-300 border rounded-md text-sm px-4 font-medium"
										placeholder="Enter detail"
									/>
								</div>
								<Button type="submit">Search</Button>
							</form>
						</div>
						<div className="relative flex justify-between">
							<div className="relative flex flex-col gap-2">
								<div className="relative text-gray-700 mb-4">
									Showing Results For:{" "}
									<span className="relative font-bold text-xl text-gray-700">
										{searchQuery || "..."}
									</span>
								</div>
							</div>
							{searchPagination &&
								searchPagination.total_pages > 1 && (
									<div className="relative flex h-auto w-auto gap-2">
										{Array.from(
											{
												length: searchPagination.total_pages,
											},
											(_, i) => i + 1
										)
											.slice(0, 3) // Show the first 3 pages
											.map((page) => (
												<div
													key={page}
													onClick={() => {
														setPageNum(page); // Directly set the page number
													}}
													className={`relative cursor-pointer h-8 w-8 flex items-center justify-center text-xs font-bold rounded-sm ${
														page ===
														searchPagination.current_page
															? "bg-gray-800 text-white"
															: "bg-gray-200"
													}`}
												>
													{page}
												</div>
											))}

										{searchPagination.total_pages > 5 &&
											searchPagination.has_more_pages && (
												<>
													<div className="relative cursor-pointer h-8 w-8 flex items-end justify-center text-xs font-bold">
														...
													</div>
													<div
														onClick={() => {
															setPageNum(
																searchPagination.total_pages
															);
														}}
														className={`relative cursor-pointer h-8 w-8 flex items-center justify-center text-xs font-bold bg-gray-200 rounded-sm`}
													>
														{
															searchPagination.total_pages
														}
													</div>
												</>
											)}
									</div>
								)}
						</div>
					</div>
					{/* Display search results or fallback message */}
					{searchProductsResult && searchProductsResult.length > 0 ? (
						<ExploreProducts allProducts={searchProductsResult} />
					) : (
						<div className="relative flex justify-center pt-32 text-xl text-gray-700">
							{loadingSearchData ? (
								<div className="">
									<div className="relative h-10 w-10 rounded-full text-gray-800 flex animate-spin justify-center items-center">
										<Loader size={20} />
									</div>
								</div>
							) : searchQuery === "" || searchQuery == null ? (
								<div>Give the related information</div>
							) : (
								<div>
									Ops! No Products with given information.
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className="relative">
				<Footer />
			</div>
		</div>
	);
}
