"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMainContext } from "@/contexts/MainContext";
import QuickViewPopUp from "@/components/quickViewPopUp";
import LandingPageNavbar from "@/components/landingPageNavbar";
import ExploreProducts from "@/components/exploreProducts";
import BrowseByCategory from "@/components/browseByCategory";
import Footer from "@/components/footer";
import FlashSale from "@/components/flashSale";
import { Button } from "@/components/ui/button";
import { Clock, Truck } from "lucide-react";
import LatestProduct from "@/components/latestProduct";

export default function LandingPage() {
	const {
		categories,
		allProducts,
		currentQuickViewProduct,
		setCurrentQuickViewProduct,
		newlyAddedProducts,
		setNewlyAddedProducts,
		costEfficientProducts,
		setCostEfficientProducts,
		getNewlyAddedProducts,
		getCostEffiecientProducts,
		mostSoldProducts,
		getLatestProduct,
		latestItem,
		filteredProducts,
		setFilteredProducts,
	} = useMainContext();
	const scrollContainerRef = useRef(null);

	useEffect(() => {
		getLatestProduct();

		getNewlyAddedProducts();

		getCostEffiecientProducts();

		const handleScroll = () => {
			const scrollContainer = scrollContainerRef.current;
			if (scrollContainer) {
				const scrollY = scrollContainer.scrollTop; // Get scroll position of the container
				const parallaxElement =
					scrollContainer.querySelector(".parallax");
				if (parallaxElement) {
					parallaxElement.style.backgroundPosition = `center ${
						-scrollY * 0.5
					}px`; // Adjust the multiplier for speed
				}
			}
		};

		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	return (
		<div className="relative h-screen w-screen overflow-hidden">
			<QuickViewPopUp filteredData={filteredProducts} />
			<div
				className="relative h-full w-full"
				style={{ fontFamily: "afacad-flux" }}
			>
				<div className="fixed top-0 z-50 bg-transparent backdrop-blur flex justify-center h-16 w-full">
					<div className="relative h-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
						<LandingPageNavbar />
					</div>
				</div>
				<div
					ref={scrollContainerRef}
					className="relative w-full h-full overflow-x-hidden overflow-y-auto flex justify-center scroll-container"
				>
					<div className="relative h-auto">
						<div className="relative grid w-full gap-4 pb-16">
							<div className="relative h-auto w-full flex-col space-y-16">
								<div
									className="relative h-auto w-screen flex justify-center parallax"
									style={{
										background: `url(https://i.pinimg.com/1200x/80/e4/12/80e4123519264db7b3dfe793094d43f9.jpg)`,

										backgroundAttachment: "fixed",
										backgroundSize: "cover",
										backgroundPosition: "center 0",
										willChange: "background-position",
									}}
								>
									<div className="relative h-auto w-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] xl:px-0 lg:px-0 md:px-0 sm:px-0 px-8">
										{latestItem && (
											<LatestProduct
												latestItem={latestItem}
											/>
										)}
									</div>
								</div>
								<div className="relative w-full h-auto flex justify-center">
									<div className="relative h-auto w-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
										<BrowseByCategory
											categories={categories}
										/>
									</div>
								</div>
								{newlyAddedProducts && (
									<div className="relative h-auto w-full flex justify-center">
										<div className="relative h-auto w-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
											<div className="relative w-full h-auto flex-col space-y-8">
												<div className="relative xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4 flex w-full justify-between">
													<div className="relative font-bold text-3xl">
														Newly Added
													</div>
													{newlyAddedProducts &&
														newlyAddedProducts.length >
															3 && (
															<div className="relative flex items-center gap-2 cursor-pointer">
																<div className="relative uppercase text-gray-800 text-sm font-bold">
																	View all
																</div>
																<div className="relative h-[2px] w-3 bg-gray-800"></div>
															</div>
														)}
												</div>
												<ExploreProducts
													allProducts={
														newlyAddedProducts
													}
												/>
											</div>
										</div>
									</div>
								)}
								{costEfficientProducts && (
									<div className="relative h-auto w-full flex justify-center">
										<div className="relative h-auto w-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
											<div className="relative w-full h-auto grid gap-8">
												<div className="relative xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4 flex w-full justify-between">
													<div className="relative font-bold text-3xl">
														Cost efficient products
													</div>
													{costEfficientProducts &&
														costEfficientProducts.length >
															3 && (
															<div className="relative flex items-center gap-2 cursor-pointer">
																<div className="relative uppercase text-gray-800 text-sm font-bold">
																	View all
																</div>
																<div className="relative h-[2px] w-3 bg-gray-800"></div>
															</div>
														)}
												</div>
												<ExploreProducts
													allProducts={
														costEfficientProducts
													}
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
		</div>
	);
}
