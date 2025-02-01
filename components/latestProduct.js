import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import RatingsStar from "./ratingsStar";
import { ShoppingCart } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { ChevronRight, Flame, Plus } from "lucide-react";
import RatingsStarExploreProducts from "./ratingStarExploreProducts";
import { useMainContext } from "@/contexts/MainContext";

export default function LatestProduct() {
	const { latestItem } = useMainContext();

	const allTransitionElementsRef = useRef([]);

	const setAllTransitionElementsRef = (el) => {
		if (el && !allTransitionElementsRef.current.includes(el)) {
			allTransitionElementsRef.current.push(el); // Add element to refs array
		}
	};

	useEffect(() => {
		if (latestItem) {
			allTransitionElementsRef.current.forEach((el, index) => {
				if (el) {
					el.style.transition = "opacity 1s ease, transform 0.3s ease";
					el.style.transitionDelay = `${index * 0.05}s`; // Increment delay
					el.style.opacity = 1;
					el.style.transform = "translateY(0)";
				}
			});
		}
	}, [latestItem]);

	return (
		<div className="relative xl:h-screen lg:h-screen h-auto w-full xl:pt-0 lg:pt-0 pt-16">
			<div className="relative flex xl:flex-row lg:flex-row flex-col-reverse xl:flex-nowrap lg:flex-nowrap flex-wrap h-full items-center gap-y-16 xl:py-0 lg:py-0 py-16">
				<div className="relative xl:w-1/2 lg:w-1/2 w-full xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4">
					<div className="relative flex-col space-y-8">
						<div className="relative flex-col space-y-4">
							<div className="relative flex">
								<div
									ref={setAllTransitionElementsRef}
									style={{ opacity: 0, transform: "translateY(20px)" }}
									className="relative text-orange-400 text-xs font-bold flex items-center gap-1 bg-gray-700 py-[.3rem] px-2 rounded-md"
								>
									<div className="relative font-sans">New Item</div>
								</div>
							</div>
							<div
								ref={setAllTransitionElementsRef}
								style={{ opacity: 0, transform: "translateY(20px)" }}
								className="relative text-3xl font-medium w-5/6 leading-[2rem]"
							>
								{latestItem?.title}
							</div>
							<div
								ref={setAllTransitionElementsRef}
								style={{ opacity: 0, transform: "translateY(20px)" }}
								className="relative w-5/6 line-clamp-3 font-medium leading-[1.5rem] text-gray-700"
								dangerouslySetInnerHTML={{ __html: latestItem?.description }}
							></div>
						</div>
						<div
							className="relative flex items-center gap-6 flex-wrap-reverse"
							ref={setAllTransitionElementsRef}
							style={{ opacity: 0, transform: "translateY(20px)" }}
						>
							<Link
								href={`/shop/${latestItem?.category.slug}/${latestItem?.id}`}
								className="relative flex h-10 bg-gray-800 text-gray-200 shadow shadow-gray-400 cursor-pointer rounded-md px-8 text-sm items-center justify-center"
							>
								<div className="relative flex items-center gap-4">
									<div className="relative text-sm font-bold">Show Now</div>
									<ChevronRight size={16} />
								</div>
							</Link>
							{latestItem?.comments?.length > 0 && (
								<div className="relative flex items-center gap-4">
									<div className="relative flex items-center w-24">
										{latestItem?.comments?.map((review, index) => {
											return (
												<div
													key={index}
													className={`absolute h-9 w-9 rounded-full bg-primary-foreground p-[2px] bg-gray-200`}
													style={{
														left: `${index * 20}px`,
													}}
												>
													<div
														className={`relative rounded-full h-full w-full`}
														style={{
															background: `url(${review.picture}) center / contain`,
														}}
													></div>
												</div>
											);
										})}
									</div>
									<div className="relative flex-col">
										<div className="relative text-yellow-500">
											{<RatingsStarExploreProducts currentProduct={latestItem} gap={1} size={10} color="red" />}
										</div>
										<div className="relative flex items-center gap-2">
											<div className="relative text-xs text-gray-800 font-bold">{latestItem?.comments?.length}+</div>
											<div className="relative text-xs text-gray-600">reviews</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="relative xl:w-1/2 lg:w-1/2 w-full xl:h-full lg:h-full h-96 flex items-end xl:justify-end lg:justify-end justify-start">
					<div className="relative w-full flex h-full">
						<div className="relative w-full h-full flex items-center">
							<div className="relative w-full grid gap-4 grid-cols-2">
								<div className="relative col-span-1 flex-col space-y-4">
									<div
										className="relative h-64 shadow-xl rounded-md"
										ref={setAllTransitionElementsRef}
										style={{
											background: `url(${latestItem.colors[0].images[0]}) center / cover no-repeat`,
											opacity: 0,
											transform: "translateY(20px)",
										}}
									></div>
									<div
										className="relative h-48 shadow-xl rounded-md"
										ref={setAllTransitionElementsRef}
										style={{
											background: `url(${latestItem.colors[1].images[1]}) center / cover`,
											opacity: 0,
											transform: "translateY(20px)",
										}}
									></div>
								</div>
								<div className="relative col-span-1 flex-col space-y-4">
									<div
										className="relative h-80 shadow-xl rounded-md"
										ref={setAllTransitionElementsRef}
										style={{
											background: `url(${latestItem.colors[1].images[0]}) center / cover`,
											opacity: 0,
											transform: "translateY(20px)",
										}}
									></div>
									<div
										className="relative h-32 shadow-xl rounded-md bg-white flex items-center px-8"
										ref={setAllTransitionElementsRef}
										style={{
											opacity: 0,
											transform: "translateY(20px)",
										}}
									>
										<div className="relative flex-col gap-4">
											<div className="relative text-3xl font-sans font-bold text-gray-800 flex flex-wrap items-center gap-2">
												102 <Plus strokeWidth={4} size={20} />
											</div>
											<div className="relative text-gray-600">Pieces Sold Today</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="absolute xl:hidden lg:hidden z-10 bottom-0 w-full left-0 h-8 bg-gradient-to-t from-primary-foreground to-transparent"></div>
						<div className="absolute shadow-xl bottom-[40%] left-[4%] z-20 bg-white rounded-full h-32 w-32 flex items-center justify-center">
							<div className="relative grid gap-1">
								<div className="relative text-center text-sm text-gray-500">Price:</div>
								<div className="relative font-bold text-3xl text-gray-800 text-center">
									${parseFloat(latestItem.price - (latestItem.discount / 100) * latestItem.price)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
