"use client";

import React, { useEffect } from "react";
import { useMainContext } from "@/contexts/MainContext";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import LandingPageNavbar from "@/components/ui/landingPageNavbar";
import ExploreProducts from "@/components/ui/exploreProducts";
import BrowseByCategory from "@/components/ui/browseByCategory";
import TrendingProduct from "@/components/ui/trendingProduct";
import Footer from "@/components/ui/footer";
import FlashSale from "@/components/ui/flashSale";

export default function LandingPage() {
	const { categories, allProducts, currentQuickViewProduct, setCurrentQuickViewProduct, mostSoldProducts } =
		useMainContext();

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
			<div className="relative h-full w-full overflow-y-auto overflow-x-hidden" style={{ fontFamily: "afacad-flux" }}>
				<div className="relative h-full overflow-x-hidden w-screen overflow-y-auto">
					<div className="sticky top-0 z-50 bg-white flex justify-center h-16 w-full">
						<div className="relative h-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
							<LandingPageNavbar />
						</div>
					</div>
					<div className="relative grid w-full gap-4 pb-16">
						<div className="relative h-auto w-full grid gap-16">
							{allProducts && (
								<div className="relative h-auto w-full flex justify-center">
									<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
										<TrendingProduct trendingProduct={allProducts[0]} />
									</div>
								</div>
							)}
							<div className="relative w-full h-auto pt-16 flex justify-center">
								<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
									<BrowseByCategory categories={categories} />
								</div>
							</div>
							{mostSoldProducts && (
								<div className="relative h-auto w-full flex justify-center">
									<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
										<div className="relative w-full h-auto grid gap-8">
											<div className="relative xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4 flex w-full justify-between">
												<div className="relative font-bold text-3xl">Most Sold</div>
												<div className="relative flex items-center gap-2 cursor-pointer">
													<div className="relative uppercase text-gray-800 text-sm font-bold">View all</div>
													<div className="relative h-[2px] w-3 bg-gray-800"></div>
												</div>
											</div>
											<ExploreProducts
												allProducts={mostSoldProducts}
												setCurrentQuickViewProduct={setCurrentQuickViewProduct}
											/>
										</div>
									</div>
								</div>
							)}
							{mostSoldProducts && (
								<div className="relative h-auto w-full flex justify-center">
									<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] w-full">
										<div className="relative w-full h-auto grid gap-8">
											<div className="relative font-bold text-3xl xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4">
												Goofy Collections
											</div>
											<ExploreProducts
												allProducts={mostSoldProducts}
												setCurrentQuickViewProduct={setCurrentQuickViewProduct}
											/>
										</div>
									</div>
								</div>
							)}
							<FlashSale />
						</div>
						<Footer />
					</div>
				</div>
			</div>
		</div>
	);
}
