"use client";
import Link from "next/link";
import React, { use } from "react";
import RatingsStar from "./ratingsStar";
import { Trash } from "lucide-react";
import { ImageWithSkeleton } from "./imageWithSkeleton";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";

export default function AllWishList({
	allProducts,
	shopCurrentCategory = null,
	neglectItem = null,
	setCurrentQuickViewProduct,
}) {
	const { removeFromWishList, setWishList } = useUserInterractionContext();

	return (
		<div className="relative w-full h-auto">
			{/* Product grid */}
			<div className="relative w-full grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
				{allProducts?.map((product, index) => {
					if (neglectItem && neglectItem.product_id === product.id) return null;

					const temp = product.product;

					return (
						<div key={index} className="relative flex">
							<div className="group relative w-full">
								<div className="relative h-auto w-full flex items-center hover:scale-[1.02] scale-100 duration-200">
									<Link href={`/shop/${temp.category.slug}/${temp.id}`} className="relative w-full h-auto">
										<div className="relative h-full w-full bg-gray-100">
											<ImageWithSkeleton src={product["product"].colors[0]?.images[0]} />
										</div>
									</Link>
									{temp.discount > 0 && (
										<div className="absolute left-0 font-sans px-2 py-1 shadow-md shadow-gray-800 top-4 bg-gray-800 text-white text-xs">
											{temp.discount}% OFF
										</div>
									)}
								</div>
								<div className="relative">
									<div className="relative grid gap-1 pt-5 px-2">
										<div className="relative text-yellow-500">
											<RatingsStar currentProduct={temp} size={10} gap={0} />
										</div>
										<Link
											href={`/shop/${temp.category.slug}/${temp.id}`}
											className="relative w-full max-w-[70%] truncate text-xl text-gray-800"
											style={{ fontFamily: "afacad-flux" }}
										>
											{temp.title}
										</Link>
										<div className="relative flex items-center gap-2">
											<div className="relative text-sm font-bold">
												{temp.currency +
													Math.round(
														(parseFloat(temp.price) - (parseFloat(temp.discount) * parseFloat(temp.price)) / 100) * 100
													) /
														100}
											</div>
											{temp.discount > 0 && (
												<div className="relative text-sm font-bold text-gray-500 line-through">
													{temp.currency + parseFloat(temp.price)}
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="relative h-auto w-full xl:flex lg:flex hidden items-center gap-4 px-2 pt-4">
									<Link
										href={`/shop/${temp.category.slug}/${temp.id}`}
										className="relative cursor-pointer text-xs uppercase hover:font-bold duration-150"
									>
										Check Out
									</Link>
									<div
										onClick={() => setCurrentQuickViewProduct(temp)}
										className="relative cursor-pointer text-xs uppercase hover:font-bold duration-150"
										aria-label="Quick View"
									>
										Quick View
									</div>
									<div
										onClick={() => {
											removeFromWishList(temp.id, setWishList);
										}}
										className="relative cursor-pointer text-xs uppercase flex items-center gap-2 bg-red-500 text-gray-200 px-2 py-1 rounded hover:font-bold duration-150"
										aria-label="Remove from Wishlist"
									>
										<Trash size={16} />
										<div className="relative">Remove</div>
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
