"use client";
import { Button } from "@/components/ui/button";
import ExploreProducts from "@/components/ui/exploreProducts";
import ShopNavbar from "@/components/ui/navbar";
import { useMainContext } from "@/contexts/MainContext";
import { ChevronLeft } from "lucide-react/dist/cjs/lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SearchPageUi() {
	const { searchQuery, setSearchQuery, searchProducts, searchProductsResult } = useMainContext();
	const path = usePathname();
	const router = useRouter();

	useEffect(() => {
		const queryTemp = decodeURIComponent(path.split("/")[2]);

		if (queryTemp.length > 0) {
			setSearchQuery(queryTemp);
			searchProducts(queryTemp);
		}
	}, []);

	const searchHandler = () => {
		if (searchQuery && searchQuery.trim() !== "") {
			searchProducts(searchQuery);
			router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
		}
	};

	const handleGoBack = () => {
		router.back();
	};

	return (
		<div className="relative h-screen w-screen overflow-x-hidden pb-16" style={{ fontFamily: "afacad-flux" }}>
			<div className="sticky top-0 left-0 z-40">
				<ShopNavbar />
			</div>
			<div className="relative h-auto w-full bg-white flex items-center justify-center pt-8 pb-4">
				<div className="relative h-auto xl:w-[50vw] lg:w-[50vw] md:w-[70vw] sm:w-[80vw] w-full px-4">
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
							<div className="relative text-sm text-gray-700">Search for your favorite clothing items.</div>
							<div className="relative w-full h-auto flex items-center gap-4">
								<div className="relative h-auto w-full">
									<input
										type="text"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="relative h-9 w-full outline-1 outline-gray-300 border-gray-300 border rounded-md text-sm px-4 font-medium"
										placeholder="Enter detail"
									/>
								</div>
								<Button onClick={searchHandler}>Search</Button>
							</div>
						</div>

						<div className="relative flex flex-col gap-2">
							<div className="relative text-gray-700">
								Showing Results For:{" "}
								<span className="relative font-bold text-xl text-gray-700">{searchQuery || "..."}</span>
							</div>
						</div>
					</div>
					{searchProductsResult && searchProductsResult.length > 0 ? (
						<ExploreProducts allProducts={searchProductsResult} />
					) : (
						<div className="relative flex justify-center pt-32 text-xl text-gray-700">
							<div>Ops! No Products with given information.</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
