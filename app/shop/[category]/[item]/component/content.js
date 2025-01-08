"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronLeft,
	ChevronRight,
	Heart,
	Minus,
	Plus,
	ShoppingBag,
	ShoppingBasket,
	Trash,
	Truck,
	Zap,
} from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AccordionContentDesign from "./accordionItem";
import PhotosUi from "./photos";
import ExploreProducts from "@/components/ui/exploreProducts";
import ShareUi from "@/components/ui/share";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import PhotoView from "@/components/ui/photoView";
import ToggleNotifier from "@/components/ui/wishListToggleNotifier";

export default function ItemPage({
	currentItemData,
	allProducts,
	currentQuickViewProduct,
	setCurrentQuickViewProduct,
	photoView,
	setPhotoView,
}) {
	const [selectedNumberItems, setSelectedNumberItems] = useState(1); // Number of items in the cart

	// Handle image click to update the slide and thumbnail
	const pathname = usePathname(); // Get the current pathname

	const pathParts = pathname.split("/");

	const pathMain = pathParts[1]; // "all"
	const pathCategory = pathParts[2]; // "all"

	const [currentColor, setCurrentColor] = useState(currentItemData?.colors[0]);

	const [currentImageIndexInView, setCurrentImageIndexInView] = useState(null);

	const [addedToCart, setAddedToCart] = useState(false);

	const [showNotifierPopUp, setShowNotifirerPopUp] = useState(false);

	const [liked, setLiked] = useState(false);

	const [likeOrCart, setLikeOrCart] = useState(null);

	const toggleCartAdded = () => {
		setAddedToCart(!addedToCart);
		setLikeOrCart("cart");
		setShowNotifirerPopUp(true);
		setTimeout(() => {
			setShowNotifirerPopUp(false);
		}, 1800);
	};

	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};

	const toggleLiked = () => {
		setLiked(!liked);
		setLikeOrCart("like");
		setShowNotifirerPopUp(true);
		setTimeout(() => {
			setShowNotifirerPopUp(false);
		}, 1800);
	};

	return (
		<div className="relative h-auto w-full">
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
			{photoView != null && (
				<PhotoView
					photoView={photoView}
					setPhotoView={setPhotoView}
					currentImageIndexInView={currentImageIndexInView}
					setCurrentImageIndexInView={setCurrentImageIndexInView}
				/>
			)}
			<ToggleNotifier
				showPopUp={showNotifierPopUp}
				addedOrRemoved={likeOrCart === "like" ? liked : addedToCart}
				likeOrCart={likeOrCart}
			/>

			<div className="relative h-auto w-full grid gap-16">
				<div className="relative h-auto w-full grid gap-4">
					<div className="relative pt-7 flex items-center justify-between px-8">
						<div className="relative h-auto w-auto">
							<div className="relative h-auto w-auto flex items-center gap-3 capitalize text-gray-600 hover:text-gray-800 font-medium">
								<div
									onClick={handleGoBack}
									className="relative cursor-pointer font-bold flex items-center gap-4"
								>
									<ChevronLeft size={14} />
									<div className="relative">Go Back</div>
								</div>
							</div>
						</div>
					</div>
					<div className="relative h-auto w-full grid lg:grid-cols-5 md:grid-cols-5 pt-4 gap-8">
						<div className="relative col-span-3 h-full xl:pr-4 lg:pr-4 md:pr-4 pr-8 pl-8">
							<PhotosUi
								photos={currentColor}
								setPhotoView={setPhotoView}
								setCurrentImageIndexInView={setCurrentImageIndexInView}
							/>
						</div>
						<div className="relative col-span-2 afacad-flux">
							<div className="relative h-auto w-full pl-8 pr-16">
								<div className="relative grid gap-6">
									<div className="relative grid gap-3">
										<div className="relative flex">
											<div className="relative text-3xl font-bold text-gray-700">
												{currentItemData["name"]}
												{currentItemData.discountPercent > 0 && (
													<div className="absolute -right-16 -top-2 px-2 z-10 py-1 shadow-md shadow-gray-700 bg-gray-700 text-yellow-300 text-sm">
														{currentItemData.discountPercent}% OFF
													</div>
												)}
											</div>
										</div>
										<div className="relative h-auto w-auto">
											<div className="relative font-bold text-gray-800 text-3xl font-sans flex items-center gap-2">
												<div className="relative">
													$
													{currentItemData["price"] -
														(currentItemData["discountPercent"] *
															currentItemData["price"]) /
															100}
												</div>
												<div className="relative text-gray-500">-</div>
												<div className="relative line-through font-medium text-xl text-gray-500">
													${currentItemData["price"]}
												</div>
											</div>
										</div>
										<div className="relative text-sm text-gray-600">
											{currentItemData["description"]}
										</div>
										<div className="relative h-auto w-full grid gap-5 pt-4">
											<div className="relative h-auto w-auto flex items-center">
												<div className="relative h-10 w-24 flex items-center">
													<div className="relative text-xs uppercase font-bold text-gray-500">
														Size
													</div>
												</div>
												<div className="relative h-auto w-[calc(100%-6rem)]">
													<Select>
														<SelectTrigger className="w-full">
															<SelectValue
																placeholder="Select Size"
																className="relative"
															/>
														</SelectTrigger>
														<SelectContent>
															{currentItemData["sizes"].map((size, index) => {
																return (
																	<SelectItem
																		className="text-xs"
																		key={index}
																		value={size}
																	>
																		{size}
																	</SelectItem>
																);
															})}
														</SelectContent>
													</Select>
												</div>
											</div>
											<div className="relative h-auto w-auto flex items-center">
												<div className="relative h-10 w-24 flex items-center">
													<div className="relative text-xs uppercase font-bold text-gray-500">
														Color
													</div>
												</div>
												<div className="relative h-auto w-[calc(100%-6rem)]">
													<div className="relative h-10 flex items-center gap-4">
														{currentItemData["colors"].map((color, index) => {
															return (
																<div
																	onClick={() => {
																		setCurrentColor(color);
																	}}
																	key={index}
																	className={`relative h-full cursor-pointer w-8 rounded shadow-md shadow-gray-400`}
																	style={{ background: `${color.name}` }}
																></div>
															);
														})}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="relative h-auto w-full">
										<div className="relative h-auto w-full grid gap-2">
											<div className="relative h-auto w-full grid gap-4">
												<div className="relative flex">
													<div className="relative flex h-10 w-auto items-center divide-gray-200 border border-gray-200 rounded">
														<div
															onClick={() => {
																setSelectedNumberItems(
																	selectedNumberItems >= 2
																		? selectedNumberItems - 1
																		: 1
																);
															}}
															className="relative h-full flex items-center justify-center text-gray-600 w-8 cursor-pointer"
														>
															<Minus size={18} stroke="currentColor" />
														</div>
														<div className="relative select-none h-1/2 w-auto px-2 flex items-center justify-center text-sm font-mono text-gray-700 font-bold border-x-[1px] border-gray-500">
															{selectedNumberItems}
														</div>
														<div
															onClick={() => {
																setSelectedNumberItems(
																	selectedNumberItems < currentItemData.stock
																		? selectedNumberItems + 1
																		: selectedNumberItems
																);
															}}
															className="relative h-full flex items-center justify-center text-gray-600 w-8 cursor-pointer"
														>
															<Plus size={18} stroke="currentColor" />
														</div>
													</div>
												</div>
												<div className="relative h-auto w-auto flex items-center flex-wrap gap-2">
													<Button
														onClick={() => {
															toggleCartAdded();
														}}
														variant={addedToCart ? "outline" : "default"}
														className="select-none"
													>
														<div className="relative">
															<ShoppingBag size={20} />
														</div>
														<div className="relative text-xs font-bold">
															{addedToCart ? "Added To Cart" : "Add to cart"}
														</div>
													</Button>
													<div className="relative h-auto w-auto flex items-center gap-2">
														<Button variant="default" className="select-none">
															<div className="relative text-yellow-500">
																<Zap
																	fill="currentColor"
																	stroke="currentColor"
																	size={20}
																/>
															</div>
															<div className="relative text-xs font-bold">
																Buy Now
															</div>
														</Button>
														<Button
															onClick={() => {
																toggleLiked();
															}}
															variant="outline"
															className={`${
																liked ? "text-red-600" : "text-gray-500"
															} select-none`}
														>
															<Heart
																stroke="currentColor"
																fill={liked ? "currentColor" : "none"}
																size={20}
															/>
														</Button>
													</div>
												</div>
											</div>
											<div className="relative flex items-center gap-2 text-gray-800">
												<div className="relative">
													<Truck size={20} strokeWidth={1.4} />
												</div>
												<div
													className="relative text-sm"
													style={{ fontFamily: "afacad-flux" }}
												>
													Free delivery over{" "}
													<span className="relative font-bold">$30.0</span>
												</div>
											</div>
										</div>
									</div>
									<div className="relative w-full pt-8">
										<AccordionContentDesign
											currentColor={currentColor}
											setCurrentColor={setCurrentColor}
											currentItemData={currentItemData}
										/>
									</div>
									<div className="relative w-full h-auto">
										<div className="relative h-auto w-full pt-6">
											<div className="relative h-auto w-full grid gap-6">
												<div
													className="relative text-sm text-gray-800"
													style={{ fontFamily: "afacad-flux" }}
												>
													Estimated Delivary: 3days
												</div>
												<ShareUi />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative h-auto w-full px-8">
					<div className="relative w-full h-auto grid gap-8 pt-8">
						<div className="relative font-bold text-gray-800 uppercase">
							Related Products
						</div>
						<ExploreProducts
							allProducts={allProducts}
							neglectItem={currentItemData}
							setCurrentQuickViewProduct={setCurrentQuickViewProduct}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
