"use client";
import Link from "next/link";
import React, { useState } from "react";
import RatingsStar from "./ratingsStar";
import { Heart, Trash } from "lucide-react";
import { ImageWithSkeleton } from "./imageWithSkeleton";
import ToggleNotifier from "./wishListToggleNotifier";

export default function AllWishList({
	allProducts,
	shopCurrentCategory = null,
	neglectItem = null,
	setCurrentQuickViewProduct,
}) {
	const [likedItems, setLikedItems] = useState([]);
	const [showLikedPopUp, setShowLikedPopUp] = useState(false);
	const [likedOrDisliked, setLikedOrDisliked] = useState(false);

	const toggleLike = (product) => {
		setLikedItems((prevLiked) => {
			const isAlreadyLiked = prevLiked.some((item) => item.id === product.id);
			setLikedOrDisliked(!isAlreadyLiked); // Update liked/disliked status
			return isAlreadyLiked
				? prevLiked.filter((item) => item.id !== product.id)
				: [...prevLiked, product];
		});
		setShowLikedPopUp(true);
		setTimeout(() => {
			setShowLikedPopUp(false);
		}, 1000);
	};

	return (
		<div className="relative w-full h-auto">
			{/* Pop-up for like/dislike */}
			<ToggleNotifier
				showPopUp={showLikedPopUp}
				addedOrRemoved={likedOrDisliked}
				likeOrCart="like"
			/>

			{/* Product grid */}
			<div className="relative w-full grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
				{allProducts?.map((product, index) => {
					if (neglectItem && neglectItem?.id === product.id) return null;

					const isLiked = likedItems.some((item) => item.id === product.id);

					return (
						<div key={index} className="relative flex">
							<div className="group relative w-full">
								<div className="relative h-auto w-full flex items-center hover:scale-[1.02] scale-100 duration-200">
									<Link
										href={`/shop/${product.category}/${product.id}`}
										className="relative w-full h-auto"
									>
										<div className="relative h-full w-full bg-gray-100">
											<ImageWithSkeleton src={product.colors[0]?.images[0]} />
										</div>
										<div
											className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 duration-300"
											style={{
												background: `url(${product.colors[0]?.images[1]}) center / cover`,
											}}
										></div>
									</Link>
									{product.discountPercent > 0 && (
										<div className="absolute left-0 font-sans px-2 py-1 shadow-md shadow-gray-500 top-4 bg-gray-500 text-white text-xs">
											{product.discountPercent}% OFF
										</div>
									)}
									<div
										onClick={() => toggleLike(product)}
										className={`absolute ${
											isLiked ? "text-red-500" : "text-gray-800"
										} cursor-pointer top-4 right-4 h-8 w-8 rounded-full *:scale-100 shadow-xl flex items-center justify-center bg-white shadow-gray-400 text-gray-800 ${
											isLiked
												? "opacity-100 *:scale-105"
												: "group-hover:opacity-100 opacity-0"
										} duration-300`}
										aria-label="Toggle Like"
									>
										<Heart
											size={12}
											stroke="currentColor"
											fill={isLiked ? "currentColor" : "none"}
										/>
									</div>
								</div>
								<div className="relative">
									<div className="relative grid gap-1 pt-5 px-2">
										<div className="relative text-yellow-500">
											<RatingsStar currentProduct={product} size={10} gap={0} />
										</div>
										<Link
											href={`/shop/${product.category}/${product.id}`}
											className="relative w-full max-w-[70%] truncate text-xl text-gray-800"
											style={{ fontFamily: "afacad-flux" }}
										>
											{product.name}
										</Link>
										<div className="relative flex items-center gap-2">
											<div className="relative text-sm font-bold">
												{product.currency +
													(
														product.price -
														(product.discountPercent * product.price) / 100
													).toFixed(2)}
											</div>
											{product.discountPercent > 0 && (
												<div className="relative text-sm font-bold text-gray-500 line-through">
													{product.currency + product.price}
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="relative h-auto w-full xl:flex lg:flex hidden items-center gap-4 px-2 pt-4">
									<Link
										href={`/shop/${product.category}/${product.id}`}
										className="relative cursor-pointer text-xs uppercase hover:font-bold duration-150"
									>
										Check Out
									</Link>
									<div
										onClick={() => setCurrentQuickViewProduct(product)}
										className="relative cursor-pointer text-xs uppercase hover:font-bold duration-150"
										aria-label="Quick View"
									>
										Quick View
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