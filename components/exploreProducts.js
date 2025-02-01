"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Eye, Heart, LoaderIcon, ZoomIn } from "lucide-react";
import ToggleNotifier from "./wishListToggleNotifier";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMainContext } from "@/contexts/MainContext";

export default function ExploreProducts({ allProducts, neglectItem = null }) {
	const [showLikedPopUp, setShowLikedPopUp] = useState(false);
	const [likedOrDisliked, setLikedOrDisliked] = useState(false);
	const { user, showLoginPopUp, setShowLoginPopUp } = useAuthContext();

	const { setCurrentQuickViewProduct, loadingProducts, setLoadingProducts, filteredProducts, setFilteredProducts } =
		useMainContext();

	// Wishlist context
	const { wishList, setWishList, addToWishList, removeFromWishList } = useUserInterractionContext();

	const toggleLike = (product) => {
		if (user) {
			const isAlreadyLiked = Array.isArray(wishList) ? wishList.some((item) => item.product_id === product.id) : false;

			if (isAlreadyLiked) {
				removeFromWishList(product.id, setWishList);
			} else {
				addToWishList(product.id, setWishList);
			}

			// Update the popup state
			setLikedOrDisliked(!isAlreadyLiked);
			setShowLikedPopUp(true);
			setTimeout(() => {
				setShowLikedPopUp(false);
			}, 1000);
		} else {
			setShowLoginPopUp(true);
		}
	};

	return (
		<div className="relative w-full h-auto xl:px-0 lg:px-0 md:px-0 px-4">
			{loadingProducts && (
				<div className="absolute z-50 bg-white/50 h-full w-full flex justify-center pt-16">
					<div className="relative flex h-auto w-auto">
						<div className="relative h-10 w-10 rounded-full flex items-center justify-center animate-spin">
							<LoaderIcon />
						</div>
					</div>
				</div>
			)}
			{/* Pop-up for like/dislike */}
			<ToggleNotifier showPopUp={showLikedPopUp} addedOrRemoved={likedOrDisliked} likeOrCart="like" />

			{/* Product grid */}

			<div className="relative w-full grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-x-5 gap-y-10">
				{allProducts?.map((product, index) => {
					if (neglectItem && neglectItem?.id === product.id) return null;

					const isLiked = Array.isArray(wishList) && wishList.some((item) => item.product_id === product.id);

					return (
						<div key={index} className="relative flex w-full">
							<div className="group relative w-full">
								<div className="relative h-auto w-full flex items-center scale-100 duration-200">
									<Link href={`/shop/${product.category.slug}/${product.id}`} className="relative w-full h-auto">
										<div className="relative h-auto w-full">
											<div className="relative xl:h-[calc(100vw/3)] lg:h-[calc(100vw/3)] h-[calc(100vw/2)] w-full bg-gray-100">
												<div
													className="relative h-full w-full"
													style={{
														background: `url(${product.colors[0]?.images[0]}) center / cover`,
													}}
												></div>
											</div>
										</div>
										<div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 duration-300 bg-white">
											<div
												className="relative h-full w-full"
												style={{
													background: `url(${product.colors[0]?.images[1]}) center / cover`,
												}}
											></div>
										</div>
									</Link>
									{product.colors.length > 0 && (
										<div className="absolute bottom-4 left-4">
											<div className="relative flex items-center gap-4 *:h-7 *:w-7 *:border *:border-gray-800">
												{product.colors.map((color, index) => (
													<div
														key={index}
														className="group-hover:scale-100 scale-0 duration-200"
														style={{ backgroundColor: color.name }}
													></div>
												))}
											</div>
										</div>
									)}
									<div className="absolute top-4 right-4 flex items-center gap-4">
										<div
											onClick={() => {
												setFilteredProducts(allProducts);
												setCurrentQuickViewProduct(product);
											}}
											className={`relative cursor-pointer h-8 w-8 rounded-full *:scale-100 shadow-xl flex items-center justify-center bg-white shadow-gray-400 text-gray-800 group-hover:opacity-100 scale-0 group-hover:scale-100 opacity-0 duration-300`}
											aria-label="Toggle Like"
										>
											<Eye size={16} stroke="currentColor" />
										</div>
										<div
											onClick={() => toggleLike(product)}
											className={`relative cursor-pointer h-8 w-8 rounded-full *:scale-100 shadow-xl flex items-center justify-center bg-white shadow-gray-400 ${
												isLiked
													? "opacity-100 text-gray-800 scale-105"
													: "group-hover:opacity-100 text-gray-800 scale-0 group-hover:scale-100 opacity-0"
											} duration-300`}
											aria-label="Toggle Like"
										>
											<Heart size={12} stroke="currentColor" fill={isLiked ? "currentColor" : "none"} />
										</div>
									</div>
									<div className="absolute bottom-4 right-4 py-1 text-xs uppercase w-auto text-gray-700 px-3 flex items-center justify-center bg-white border border-gray-600">
										{product.gender}
									</div>
								</div>
								<div className="relative w-full flex-col space-y-4 py-5">
									<div className="relative w-full">
										<div className="relative flex-col w-full space-y-2">
											<Link href={`/shop/${product.category.slug}/${product.id}`} style={{ fontFamily: "afacad-flux" }}>
												<div className="relative truncate text-sm text-gray-800 font-bold font-sans">
													{product.title}
												</div>
											</Link>
											<div className="relative flex items-center gap-2">
												<div className="relative flex items-center gap-2">
													<div className="relative flex items-center gap-2">
														<div className="relative font-bold text-gray-600 text-sm">{product.currency}</div>
														<div className="relative font-bold text-black">
															{product.price - parseFloat(product.discount * product.price) / 100}
														</div>
													</div>
													{product.discount > 0 && (
														<div className="relative font-bold text-gray-500 line-through">
															{product.currency + parseFloat(product.price)}
														</div>
													)}
												</div>
												{product.discount > 0 && (
													<div className="relative font-bold text-green-600">
														{parseFloat(product.discount).toString()}% off
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
