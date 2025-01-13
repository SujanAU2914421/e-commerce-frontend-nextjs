"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Minus, Plus, ShoppingBag, Truck, Zap } from "lucide-react/dist/cjs/lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AccordionContentDesign from "./accordionItem";
import PhotosUi from "./photos";
import ExploreProducts from "@/components/ui/exploreProducts";
import ShareUi from "@/components/ui/share";
import QuickViewPopUp from "@/components/ui/quickViewPopUp";
import PhotoView from "@/components/ui/photoView";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { addToCart, removeFromCart } from "@/lib/cartsHandle";
import { addToWishList, removeFromWishList } from "@/lib/wishListHandle";

export default function ItemPage({
	currentItemData,
	allProducts,
	currentQuickViewProduct,
	setCurrentQuickViewProduct,
	photoView,
	setPhotoView,
}) {
	const { cartItems, setCartItems, wishList, setWishList } = useUserInterractionContext();

	const [currentColor, setCurrentColor] = useState(currentItemData.colors[0]);

	const [currentImageIndexInView, setCurrentImageIndexInView] = useState(null);

	const [addedToCart, setAddedToCart] = useState(false);

	const [selectedNumberItems, setSelectedNumberItems] = useState(1);
	const [selectedSize, setSelectedSize] = useState(currentItemData.sizes[0]);
	const [selectedColor, setSelectedColor] = useState(currentItemData.colors[0].name);

	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};

	useEffect(() => {
		console.log(wishList);
	}, [wishList]);

	useEffect(() => {
		if (currentItemData) {
			setSelectedColor(currentItemData.colors[0].name);
			setSelectedSize(currentItemData.sizes[0]);
		}
	}, [currentItemData]);

	return (
		<div className="relative h-auto w-full">
			{currentQuickViewProduct != null && currentQuickViewProduct != [] && (
				<QuickViewPopUp
					filteredData={allProducts}
					currentQuickViewProduct={currentQuickViewProduct}
					setCurrentQuickViewProduct={setCurrentQuickViewProduct}
				/>
			)}
			{photoView != null && (
				<PhotoView
					photoView={photoView}
					setPhotoView={setPhotoView}
					currentImageIndexInView={currentImageIndexInView}
					setCurrentImageIndexInView={setCurrentImageIndexInView}
				/>
			)}

			<div className="relative h-auto w-full grid gap-16">
				<div className="relative h-auto w-full grid gap-4">
					<div className="relative pt-7 flex items-center justify-between px-8">
						<div className="relative h-auto w-auto">
							<div className="relative h-auto w-auto flex items-center gap-3 capitalize text-gray-600 hover:text-gray-800 font-medium">
								<div onClick={handleGoBack} className="relative cursor-pointer font-bold flex items-center gap-4">
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
												{currentItemData.title}
												{currentItemData.discount > 0 && (
													<div className="absolute -right-16 -top-2 px-2 z-10 py-1 shadow-md shadow-gray-700 bg-gray-700 text-yellow-300 text-sm">
														{currentItemData.discount}% OFF
													</div>
												)}
											</div>
										</div>
										<div className="relative h-auto w-auto">
											<div className="relative font-bold text-gray-800 text-3xl font-sans flex items-center gap-2">
												<div className="relative">
													$
													{currentItemData.price && currentItemData.discount
														? Math.round(
																parseFloat(currentItemData.price) -
																	(parseFloat(currentItemData.discount) * parseFloat(currentItemData.price)) / 100
														  )
														: "N/A"}
												</div>
												<div className="relative text-gray-500">-</div>
												<div className="relative line-through font-medium text-xl text-gray-500">
													{currentItemData.price ? `$${Math.round(parseFloat(currentItemData.price))}` : "N/A"}
												</div>
											</div>
										</div>
										<div
											className="relative text-sm text-gray-600"
											dangerouslySetInnerHTML={{ __html: currentItemData.description }}
										></div>

										<div className="relative h-auto w-full grid gap-5 pt-4">
											<div className="relative h-auto w-auto flex items-center">
												<div className="relative h-10 w-24 flex items-center">
													<div className="relative text-xs uppercase font-bold text-gray-500">Size</div>
												</div>
												<div className="relative h-auto w-[calc(100%-6rem)]">
													<div className="flex gap-2 flex-wrap">
														{currentItemData["sizes"].map((size, index) => (
															<div
																key={index}
																className={`px-4 py-2 text-xs border rounded-md cursor-pointer ${
																	selectedSize === size ? "bg-gray-800 text-white" : "hover:bg-gray-100"
																}`}
																onClick={() => {
																	setSelectedSize(size);
																}}
															>
																{size}
															</div>
														))}
													</div>
												</div>
											</div>
											<div className="relative h-auto w-auto flex items-center">
												<div className="relative h-10 w-24 flex items-center">
													<div className="relative text-xs uppercase font-bold text-gray-500">Color</div>
												</div>
												<div className="relative h-auto w-[calc(100%-6rem)]">
													<div className="relative h-10 flex items-center gap-4">
														{currentItemData["colors"].map((color, index) => {
															return (
																<div
																	onClick={() => {
																		setCurrentColor(color);
																		setSelectedColor(color);
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
											<div className="relative h-auto w-full flex-col">
												<div className="relative flex">
													<div className="relative flex h-10 w-auto items-center divide-gray-200 border border-gray-200 rounded">
														<div
															onClick={() => {
																setSelectedNumberItems(selectedNumberItems >= 2 ? selectedNumberItems - 1 : 1);
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
												<div className="relative h-auto w-auto flex items-center flex-wrap gap-2 pt-4">
													<Button
														onClick={() => {
															if (selectedNumberItems > 0 && selectedSize && selectedColor) {
																cartItems.some((item) => item.product_id === currentItemData.id)
																	? addToCart(
																			currentItemData.id,
																			setCartItems,
																			selectedNumberItems,
																			selectedColor,
																			selectedSize
																	  )
																	: removeFromCart(currentItemData.id, setCartItems);
															}
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
																<Zap fill="currentColor" stroke="currentColor" size={20} />
															</div>
															<div className="relative text-xs font-bold">Buy Now</div>
														</Button>
													</div>
												</div>
												<div className="relative flex mt-3">
													<div
														onClick={() => {
															if (wishList.some((item) => item.product_id === currentItemData.id)) {
																removeFromWishList(currentItemData.id, setWishList);
																console.log(currentItemData.id);
															} else {
																addToWishList(currentItemData.id, setWishList);
															}
														}}
														className={` select-none text-gray-900 flex items-center gap-2 cursor-pointer group`}
													>
														<Heart
															stroke="currentColor"
															fill={
																wishList.some((item) => item.product_id === currentItemData.id)
																	? "currentColor"
																	: "none"
															}
															size={16}
														/>
														<div className="relative text-sm text-gray-700 group-hover:underline">
															{wishList.some((item) => item.product_id === currentItemData.id)
																? "Remove From WishList"
																: "Add To Your WishList"}
														</div>
													</div>
												</div>
											</div>
											<div className="relative flex items-center gap-2 text-gray-800 pt-4">
												<div className="relative">
													<Truck size={20} strokeWidth={1.4} />
												</div>
												<div className="relative text-sm" style={{ fontFamily: "afacad-flux" }}>
													Free delivery over <span className="relative font-bold">$30.0</span>
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
												<div className="relative text-sm text-gray-800" style={{ fontFamily: "afacad-flux" }}>
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
						<div className="relative font-bold text-gray-800 uppercase">Related Products</div>
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
