"use client";

import React from "react";
import { useMainContext } from "@/contexts/MainContext";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import LandingPageNavbar from "@/components/ui/landingPageNavbar";
import ExploreProducts from "@/components/ui/exploreProducts";
import BrowseByCategory from "@/components/ui/browseByCategory";
import TrendingProduct from "@/components/ui/trendingProduct";
import AdProduct from "@/components/ui/adProduct";

export default function LandingPage() {
	const {
		categories,
		allProducts,
		currentQuickViewProduct,
		setCurrentQuickViewProduct,
		mostSoldProduts,
		setMostSoldProducts,
	} = useMainContext();
	return (
		<div className="relative h-screen w-screen overflow-hidden">
			{
				// If quickViewPopUp is true, render the QuickViewPopUp component
				currentQuickViewProduct != null && currentQuickViewProduct != [] && (
					<QuickViewPopUp
						filteredData={allProducts}
						currentQuickViewProduct={currentQuickViewProduct}
						setCurrentQuickViewProduct={setCurrentQuickViewProduct}
					/>
				)
			}
			<div
				className="relative h-full w-full overflow-y-auto overflow-x-hidden"
				style={{ fontFamily: "afacad-flux" }}
			>
				<div className="relative h-full overflow-x-hidden w-screen overflow-y-auto">
					<div className="sticky top-0 z-50 bg-white flex justify-center h-16 w-full">
						<div className="relative h-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
							<LandingPageNavbar />
						</div>
					</div>
					<div className="relative grid w-full gap-4 pb-16">
						<div className="relative h-auto w-full grid gap-16">
							<div className="relative h-auto w-full flex justify-center">
								<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
									<TrendingProduct trendingProduct={allProducts[1]} />
								</div>
							</div>
							<div className="relative w-full h-auto pt-16 flex justify-center">
								<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
									<BrowseByCategory categories={categories} />
								</div>
							</div>
							<div className="relative h-auto w-full pt-16 flex justify-center bg-gray-100">
								<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full overflow-hidden">
									<AdProduct adProduct={allProducts[0]} />
								</div>
							</div>
							<div className="relative h-auto w-full bg-white flex justify-center">
								<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
									<div className="relative w-full h-auto grid gap-8">
										<div className="relative font-bold text-3xl xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4">
											Most Sold
										</div>
										<ExploreProducts
											allProducts={allProducts}
											setCurrentQuickViewProduct={setCurrentQuickViewProduct}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
