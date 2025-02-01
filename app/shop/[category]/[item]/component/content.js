"use client";

import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	Heart,
	Minus,
	Plus,
	ShoppingBag,
	Truck,
	Zap,
} from "lucide-react/dist/cjs/lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AccordionContentDesign from "./accordionItem";
import PhotosUi from "./photos";
import ExploreProducts from "@/components/exploreProducts";
import ShareUi from "@/components/share";
import QuickViewPopUp from "@/components/quickViewPopUp";
import PhotoView from "@/components/photoView";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { addToCart, removeFromCart } from "@/lib/cartsHandle";
import { addToWishList, removeFromWishList } from "@/lib/wishListHandle";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMainContext } from "@/contexts/MainContext";

export default function ItemPage({}) {
	const { user, setShowLoginPopUp } = useAuthContext();
	const {
		shopCurrentCategory,
		setShopCurrentCategory,
		allProducts,
		currentQuickViewProduct,
		setCurrentQuickViewProduct,
		photoView,
		setPhotoView,
		relatedProducts,
		setRelatedProducts,
		getRelatedProducts,
		currentItemData,
		setCurrentItemData,
		getProduct,
	} = useMainContext();

	const { cartItems, setCartItems, wishList, setWishList } =
		useUserInterractionContext();

	const [currentColor, setCurrentColor] = useState(null);

	const [currentImageIndexInView, setCurrentImageIndexInView] =
		useState(null);

	const [addedToCart, setAddedToCart] = useState(false);

	const [selectedNumberItems, setSelectedNumberItems] = useState(1);
	const [selectedSize, setSelectedSize] = useState(currentItemData.sizes[0]);
	const [selectedColor, setSelectedColor] = useState(
		currentItemData.colors[0].name
	);

	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};

	useEffect(() => {
		if (currentItemData) {
			setCurrentColor(currentItemData.colors[0]);
			getRelatedProducts(currentItemData.category.id);
			setSelectedColor(currentItemData.colors[0].name);
			setSelectedSize(currentItemData.sizes[0]);
		}
	}, [currentItemData]);

	return (
		<div className="relative h-auto w-full flex justify-center">
			<div className="relative h-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
				<QuickViewPopUp filteredData={allProducts} />
				{photoView != null && (
					<PhotoView
						photoView={photoView}
						setPhotoView={setPhotoView}
						currentImageIndexInView={currentImageIndexInView}
						setCurrentImageIndexInView={setCurrentImageIndexInView}
					/>
				)}

				<div className="relative h-auto w-full flex-col space-y-16">
					<div className="relative h-auto w-full grid gap-4">
						<div className="relative pt-7 flex items-center justify-between">
							<div className="relative h-auto w-auto xl:px-0 lg:px-0 md:px-0 px-4">
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
							<div className="relative col-span-3 h-full xl:px-0 lg:px-0 md:px-0 px-4">
								{currentColor && (
									<PhotosUi
										photos={currentColor}
										setPhotoView={setPhotoView}
										setCurrentImageIndexInView={
											setCurrentImageIndexInView
										}
									/>
								)}
							</div>
							<div className="relative col-span-2 afacad-flux">
								<div className="relative h-auto w-full xl:px-0 lg:px-0 md:px-0 px-4">
									<div className="relative grid gap-6">
										<div className="relative grid gap-3">
											<div className="relative flex">
												<div className="relative text-3xl font-bold text-gray-700">
													{currentItemData.title}
													{currentItemData.discount >
														0 && (
														<div className="absolute left-0 -top-6 px-2 z-10 py-1 shadow-md shadow-gray-700 bg-gray-700 text-yellow-300 text-sm">
															{
																currentItemData.discount
															}
															% OFF
														</div>
													)}
												</div>
											</div>
											<div className="relative h-auto w-auto">
												<div className="relative font-bold text-gray-800 text-3xl font-sans flex items-center gap-2">
													<div className="relative">
														$
														{currentItemData.price &&
														currentItemData.discount
															? Math.round(
																	parseFloat(
																		currentItemData.price
																	) -
																		(parseFloat(
																			currentItemData.discount
																		) *
																			parseFloat(
																				currentItemData.price
																			)) /
																			100
															  )
															: "N/A"}
													</div>
													<div className="relative line-through font-medium text-xl text-gray-500">
														{currentItemData.discount >
															0 &&
															currentItemData.price &&
															`- $${Math.round(
																parseFloat(
																	currentItemData.price
																)
															)}`}
													</div>
												</div>
											</div>
											<div
												className="relative text-sm text-gray-600"
												dangerouslySetInnerHTML={{
													__html: currentItemData.description,
												}}
											></div>
											{!cartItems.some(
												(cartItem) =>
													cartItem.product_id ===
													currentItemData.id
											) && (
												<div className="relative h-auto w-full grid gap-5 pt-4">
													<div className="relative h-auto w-auto flex items-center">
														<div className="relative h-10 w-24 flex items-center">
															<div className="relative text-xs uppercase font-bold text-gray-500">
																Size
															</div>
														</div>
														<div className="relative h-auto w-[calc(100%-6rem)]">
															<div className="flex gap-2 flex-wrap">
																{currentItemData[
																	"sizes"
																].map(
																	(
																		size,
																		index
																	) => (
																		<div
																			key={
																				index
																			}
																			className={`px-4 py-2 text-xs border rounded-md cursor-pointer ${
																				selectedSize ===
																				size
																					? "bg-gray-800 text-white"
																					: "hover:bg-gray-100"
																			}`}
																			onClick={() => {
																				setSelectedSize(
																					size
																				);
																			}}
																		>
																			{
																				size
																			}
																		</div>
																	)
																)}
															</div>
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
																{currentItemData[
																	"colors"
																].map(
																	(
																		color,
																		index
																	) => {
																		return (
																			<div
																				onClick={() => {
																					setCurrentImageIndexInView(
																						0
																					);
																					setCurrentColor(
																						color
																					);
																					setSelectedColor(
																						color.name
																					);
																				}}
																				key={
																					index
																				}
																				className={`relative h-full cursor-pointer ${
																					selectedColor ==
																					color.name
																						? "scale-110 shadow-md duration-200 border-none shadow-gray-500"
																						: "scale-100 border border-gray-600"
																				} w-8 rounded`}
																				style={{
																					background: `${color.name}`,
																				}}
																			></div>
																		);
																	}
																)}
															</div>
														</div>
													</div>
												</div>
											)}
										</div>
										<div className="relative h-auto w-full">
											<div className="relative h-auto w-full grid gap-2">
												<div className="relative h-auto w-full flex-col">
													{!cartItems.some(
														(cartItem) =>
															cartItem.product_id ===
															currentItemData.id
													) && (
														<div className="relative flex">
															<div className="relative flex h-10 w-auto items-center divide-gray-200 border border-gray-200 rounded">
																<div
																	onClick={() => {
																		setSelectedNumberItems(
																			selectedNumberItems >=
																				2
																				? selectedNumberItems -
																						1
																				: 1
																		);
																	}}
																	className="relative h-full flex items-center justify-center text-gray-600 w-8 cursor-pointer"
																>
																	<Minus
																		size={
																			18
																		}
																		stroke="currentColor"
																	/>
																</div>
																<div className="relative select-none h-1/2 w-auto px-2 flex items-center justify-center text-sm font-mono text-gray-700 font-bold border-x-[1px] border-gray-500">
																	{
																		selectedNumberItems
																	}
																</div>
																<div
																	onClick={() => {
																		setSelectedNumberItems(
																			selectedNumberItems <
																				currentItemData.stock
																				? selectedNumberItems +
																						1
																				: selectedNumberItems
																		);
																	}}
																	className="relative h-full flex items-center justify-center text-gray-600 w-8 cursor-pointer"
																>
																	<Plus
																		size={
																			18
																		}
																		stroke="currentColor"
																	/>
																</div>
															</div>
														</div>
													)}
													<div className="relative h-auto w-auto flex items-center flex-wrap gap-2 pt-4">
														{cartItems.some(
															(cartItem) =>
																cartItem.product_id ===
																currentItemData.id
														) ? (
															<Button
																variant={
																	"outline"
																}
																className="select-none"
																onClick={() => {
																	if (user) {
																		removeFromCart(
																			currentItemData.id,
																			setCartItems
																		);
																	} else {
																		setShowLoginPopUp(
																			true
																		);
																	}
																}}
															>
																<div className="relative">
																	<ShoppingBag
																		size={
																			20
																		}
																	/>
																</div>
																<div className="relative text-xs font-bold">
																	Remove From
																	Cart
																</div>
															</Button>
														) : (
															<Button
																variant={
																	"default"
																}
																className="select-none"
																onClick={() => {
																	if (user) {
																		addToCart(
																			currentItemData.id,
																			setCartItems,
																			selectedNumberItems,
																			selectedColor,
																			selectedSize
																		);
																	} else {
																		setShowLoginPopUp(
																			true
																		);
																	}
																}}
															>
																<div className="relative">
																	<ShoppingBag
																		size={
																			20
																		}
																	/>
																</div>
																<div className="relative text-xs font-bold">
																	Add To Cart
																</div>
															</Button>
														)}
														<div className="relative h-auto w-auto flex items-center gap-2">
															<Button
																variant="default"
																className="select-none"
															>
																<div className="relative text-yellow-500">
																	<Zap
																		fill="currentColor"
																		stroke="currentColor"
																		size={
																			20
																		}
																	/>
																</div>
																<div className="relative text-xs font-bold">
																	Buy Now
																</div>
															</Button>
														</div>
													</div>
													<div className="relative flex mt-3">
														<div
															onClick={() => {
																if (user) {
																	if (
																		wishList.some(
																			(
																				item
																			) =>
																				item.product_id ===
																				currentItemData.id
																		)
																	) {
																		removeFromWishList(
																			currentItemData.id,
																			setWishList
																		);
																	} else {
																		addToWishList(
																			currentItemData.id,
																			setWishList
																		);
																	}
																} else {
																	setShowLoginPopUp(
																		true
																	);
																}
															}}
															className={` select-none text-gray-900 flex items-center gap-2 cursor-pointer group`}
														>
															<Heart
																stroke="currentColor"
																fill={
																	wishList.some(
																		(
																			item
																		) =>
																			item.product_id ===
																			currentItemData.id
																	)
																		? "currentColor"
																		: "none"
																}
																size={16}
															/>
															<div className="relative text-sm text-gray-700 group-hover:underline">
																{wishList.some(
																	(item) =>
																		item.product_id ===
																		currentItemData.id
																)
																	? "Remove From WishList"
																	: "Add To Your WishList"}
															</div>
														</div>
													</div>
												</div>
												<div className="relative flex items-center gap-2 text-gray-800 pt-4">
													<div className="relative">
														<Truck
															size={20}
															strokeWidth={1.4}
														/>
													</div>
													<div
														className="relative text-sm"
														style={{
															fontFamily:
																"afacad-flux",
														}}
													>
														Free delivery.
													</div>
												</div>
											</div>
										</div>
										<div className="relative w-full pt-8">
											<AccordionContentDesign
												currentColor={currentColor}
												setCurrentColor={
													setCurrentColor
												}
												currentItemData={
													currentItemData
												}
											/>
										</div>
										<div className="relative w-full h-auto">
											<div className="relative h-auto w-full pt-6">
												<div className="relative h-auto w-full grid gap-6">
													<div
														className="relative text-sm text-gray-800"
														style={{
															fontFamily:
																"afacad-flux",
														}}
													>
														Estimated Delivary:
														3days
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
					<div className="relative h-auto w-full flex justify-center">
						<div className="relative h-auto w-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
							<div className="relative w-full h-auto grid gap-8 pt-8">
								<div className="relative font-bold text-gray-800 uppercase xl:px-0 lg:px-0 md:px-0 px-4">
									Related Products
								</div>
								<ExploreProducts
									allProducts={relatedProducts}
									neglectItem={currentItemData}
									setCurrentQuickViewProduct={
										setCurrentQuickViewProduct
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
