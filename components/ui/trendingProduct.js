import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import RatingsStar from "./ratingsStar";
import { ShoppingCart } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";

export default function TrendingProduct({ trendingProduct }) {
	const allTransitionElementsRef = useRef([]);

	const setAllTransitionElementsRef = (el) => {
		if (el && !allTransitionElementsRef.current.includes(el)) {
			allTransitionElementsRef.current.push(el); // Add element to refs array
		}
	};

	useEffect(() => {
		allTransitionElementsRef.current.forEach((el, index) => {
			if (el) {
				el.style.transition = "opacity 1s ease, transform 0.3s ease";
				el.style.transitionDelay = `${index * 0.05}s`; // Increment delay
				el.style.opacity = 1;
				el.style.transform = "translateY(0)";
			}
		});
	}, []);
	return (
		<div className="relative h-screen w-full">
			<div className="relative flex xl:flex-row lg:flex-row flex-col-reverse xl:flex-nowrap lg:flex-nowrap flex-wrap h-full items-center gap-y-8">
				<div className="relative xl:w-1/2 lg:w-1/2 w-full xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4">
					<div className="relative grid gap-8">
						<div className="relative grid gap-4">
							<div
								ref={setAllTransitionElementsRef}
								style={{ opacity: 0, transform: "translateY(20px)" }}
								className="relative text-red-400 text-sm font-medium flex items-center gap-2"
							>
								<div>
									<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 24c-5 0-9-4-9-9 0-4 2.4-8.2 3.4-9.8C7 4.3 9.8 0 12 0c.6 0 1 .4 1 1s-.4 1-1 1c-1.4.2-7 7.4-7 13 0 3.9 3.1 7 7 7s7-3.1 7-7c0-.8-.1-1.6-.3-2.6-.5-1.9-1.4-4.1-2.7-6.1-.3-.5-.2-1.1.3-1.4.5-.3 1.1-.2 1.4.3 1.4 2.2 2.4 4.6 3 6.7.2 1.1.3 2.2.3 3.1 0 5-4 9-9 9z"></path>
										<path d="M15 9.9c-.3 0-.6-.1-.8-.3C12.1 7.2 11 4.2 11 1c0-.6.4-1 1-1s1 .4 1 1c0 2.7 1 5.3 2.7 7.3.4.4.3 1-.1 1.4-.1.1-.4.2-.6.2z"></path>
										<path d="M15 9.9c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4.7-.8 1.3-1.7 1.5-2.7.1-.5.7-.8 1.2-.7.5.1.9.7.7 1.2-.3 1.3-1.1 2.6-2 3.6-.2.2-.5.3-.7.3zM12 24c-2.8 0-5-2.2-5-5 0-3.1 3.1-8 5-8 .6 0 1 .4 1 1 0 .5-.4.9-.9 1-.7.4-3.1 3.6-3.1 6 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.3-.1-.7-.2-1.2-.2-.9-.7-1.9-1.3-2.9-.3-.5-.2-1.1.3-1.4.5-.3 1.1-.2 1.4.3.7 1.1 1.3 2.4 1.6 3.5.1.6.2 1.1.2 1.7 0 2.8-2.2 5-5 5z"></path>
										<path d="M13.5 17c-.3 0-.6-.1-.8-.3-1.1-1.4-1.7-3-1.7-4.7 0-.6.4-1 1-1s1 .4 1 1c0 1.2.4 2.4 1.2 3.3.4.4.3 1-.1 1.4-.1.2-.4.3-.6.3z"></path>
										<path d="M13.5 17c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4.3-.3.5-.7.6-1.1.1-.5.7-.9 1.2-.7.5.1.9.7.7 1.2-.2.8-.6 1.5-1.2 2-.1.2-.4.3-.6.3z"></path>
									</svg>
								</div>
								<div className="relative text-gray-400">Most Loved</div>
							</div>
							<div
								ref={setAllTransitionElementsRef}
								style={{ opacity: 0, transform: "translateY(20px)" }}
								className="relative text-3xl font-medium w-5/6 leading-[2rem]"
							>
								{trendingProduct?.title}
							</div>
							<div
								ref={setAllTransitionElementsRef}
								style={{ opacity: 0, transform: "translateY(20px)" }}
								className="relative w-5/6 line-clamp-3 font-medium leading-[1.5rem] text-gray-700"
								dangerouslySetInnerHTML={{ __html: trendingProduct?.description }}
							></div>
						</div>
						<div
							ref={setAllTransitionElementsRef}
							style={{ opacity: 0, transform: "translateY(20px)" }}
							className="relative flex items-center gap-6 flex-wrap-reverse"
						>
							<Link
								href={`/shop/${trendingProduct?.category.slug}/${trendingProduct?.id}`}
								className="relative flex h-10 bg-gray-800 text-gray-200 shadow shadow-gray-400 cursor-pointer rounded-md px-8 text-sm items-center justify-center"
							>
								<div className="relative flex items-center gap-4">
									<ShoppingCart size={16} />
									<div className="relative text-sm font-bold">Check out</div>
								</div>
							</Link>
							{trendingProduct?.comments?.length > 0 && (
								<div className="relative flex items-center gap-4">
									<div className="relative flex items-center w-24">
										{trendingProduct?.comments?.map((review, index) => {
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
									<div className="relative grid">
										<div className="relative text-yellow-500">
											{<RatingsStar currentProduct={trendingProduct} gap={1} size={10} color="red" />}
										</div>
										<div className="relative flex items-center gap-2">
											<div className="relative text-xs text-gray-800 font-bold">100+</div>
											<div className="relative text-xs text-gray-600">reviews</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					ref={setAllTransitionElementsRef}
					style={{ opacity: 0 }}
					className="relative xl:w-1/2 lg:w-1/2 w-full xl:h-full lg:h-full h-96 flex items-end xl:justify-end lg:justify-end justify-start"
				>
					<div className="relative w-full flex h-full">
						<div className="relative w-full h-full">
							<div
								className="relative xl:w-full lg:w-full md:w-full w-full h-full"
								style={{
									background: `url("${trendingProduct?.colors[0].images[0]}") center / cover`,
								}}
							></div>
						</div>
						<div className="absolute xl:hidden lg:hidden z-10 bottom-0 w-full left-0 h-8 bg-gradient-to-t from-primary-foreground to-transparent"></div>
						<div className="absolute shadow-xl bottom-[40%] left-[4%] z-20 bg-white rounded-full h-32 w-32 flex items-center justify-center">
							<div className="relative grid gap-1">
								<div className="relative text-center text-sm text-gray-500">Price:</div>
								<div className="relative font-bold text-3xl text-gray-800 text-center">${trendingProduct?.price}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
