import {
	Heart,
	Minus,
	MoveLeft,
	MoveRight,
	Plus,
	ShoppingBag,
	Truck,
	X,
	XIcon,
	Zap,
} from "lucide-react/dist/cjs/lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ShareUi from "./share";
import RatingsStar from "./ratingsStar";
import AccordionContentDesignForQuickView from "./accordionContentDesignForQuickView";
import Link from "next/link";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useMainContext } from "@/contexts/MainContext";

const QuickViewPopUpUi = ({ filteredData }) => {
	const { currentQuickViewProduct, setCurrentQuickViewProduct } = useMainContext();

	const [currentIndex, setCurrentIndex] = useState(
		filteredData.findIndex((item) => item.id === currentQuickViewProduct.id)
	);

	const { user } = useAuthContext();

	const {
		wishList,
		setWishList,
		addToWishList,
		removeFromWishList,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
	} = useUserInterractionContext();

	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);

	const allTransitionElementsRef = useRef([]);

	const setAllTransitionElementsRef = (el) => {
		if (el && !allTransitionElementsRef.current.includes(el)) {
			allTransitionElementsRef.current.push(el);
		}
	};

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleMoveLeft = () => {
		const newIndex = (currentIndex - 1 + filteredData.length) % filteredData.length;
		setCurrentIndex(newIndex);
		setCurrentQuickViewProduct(filteredData[newIndex]);
	};

	const [selectedNumberItems, setSelectedNumberItems] = useState(1);
	const [selectedColor, setSelectedColor] = useState(currentQuickViewProduct?.colors[0].name);
	const [selectedSize, setSelectedSize] = useState(currentQuickViewProduct?.sizes[0]);

	const handleMoveRight = () => {
		const newIndex = (currentIndex + 1) % filteredData.length;
		setCurrentIndex(newIndex);
		setCurrentQuickViewProduct(filteredData[newIndex]);
	};

	const previousDataExists = currentIndex > 0;
	const nextDataExists = currentIndex < filteredData.length - 1;

	const scrollableDivRef = useRef(null);

	useEffect(() => {
		setCurrentColor(currentQuickViewProduct?.colors[0]);

		allTransitionElementsRef.current.forEach((el, index) => {
			if (el) {
				el.style.transition = "0s ease";
				el.style.transitionDelay = `0s`;
				el.style.opacity = 0;
				el.style.transform = "translateY(20px)";
				el.style.transform = "scale(1)";
			}
		});

		setTimeout(() => {
			allTransitionElementsRef.current.forEach((el, index) => {
				if (el) {
					el.style.transition = "0.5s ease";
					el.style.transitionDelay = `${index * 0.05}s`;
					el.style.opacity = 1;
					el.style.transform = "translateY(0)";
					el.style.transform = "scale(1)";
				}
			});
		}, 300);

		if (scrollableDivRef.current) {
			scrollableDivRef.current.scrollTop = 0;
		}
	}, [currentQuickViewProduct]);

	const [currentColor, setCurrentColor] = useState(currentQuickViewProduct?.colors[0]);

	const mainContainerRef = useRef(null);

	const hideQuickViewPopUpClickHandler = () => {
		if (mainContainerRef.current) {
			mainContainerRef.current.style.transition = "0.5s ease";
			mainContainerRef.current.style.opacity = 0;
			mainContainerRef.current.style.transform = "translateY(20px)";
			setTimeout(() => {
				setCurrentQuickViewProduct(null);
			}, 300);
		}
	};

	useEffect(() => {
		mainContainerRef.current.style.transition = "0.5s ease";
		mainContainerRef.current.style.opacity = 1;
		mainContainerRef.current.style.transform = "translateY(0)";
		allTransitionElementsRef.current.forEach((el, index) => {
			if (el) {
				el.style.transition = "0.5s ease";
				el.style.transitionDelay = `${index * 0.05}s`;
				el.style.opacity = 1;
				el.style.transform = "translateY(0)";
				el.style.transform = "scale(1)";
			}
		});
	}, []);

	return (
		<div
			style={{
				fontFamily: "afacad-flux",
			}}
			className="fixed top-0 left-0 z-[99999] h-screen w-screen bg-black/30"
		>
			<div className="relative h-full w-full flex items-center justify-center py-20">
				<div
					className="absolute group h-screen w-screen"
					onMouseMove={(e) => {
						setPosX(e.clientX);
						setPosY(e.clientY);
					}}
					onClick={() => {
						hideQuickViewPopUpClickHandler();
					}}
				>
					<div
						style={{
							left: posX - 15 + "px",
							top: posY - 15 + "px",
							height: 30,
							width: 30,
						}}
						className="absolute"
					>
						<div className="relative h-full w-full rounded-full bg-white/80 flex items-center justify-center group-hover:opacity-100 opacity-0 text-red-500 cursor-pointer">
							<XIcon size={20} stroke="currentColor" />
						</div>
					</div>
				</div>
				<div className="relative w-[70vw] xl:flex lg:flex md:flex hidden h-full">
					<div
						ref={mainContainerRef}
						className="relative h-full w-full bg-gray-100 duration-300"
						style={{ opacity: 0, transform: "translateY(20px)" }}
					>
						<div className="relative h-full w-full flex">
							<div className="relative w-1/2 h-full bg-gray-100">
								<div
									className="relative w-full h-full flex items-end justify-center pb-8 group"
									style={{
										background: `url(${currentColor.images[currentImageIndex]}) center / cover`,
									}}
								>
									<div className="relative flex items-center gap-5 flex-wrap justify-center *:group-hover:opacity-100 *:opacity-0 *:duration-200 *:translate-y-1 *:group-hover:translate-y-0">
										{currentColor.images.map((image, index) => {
											return (
												<div
													key={index}
													className={`relative bg-white shadow-xl border border-gray-100 h-16 cursor-pointer w-16 ${
														currentImageIndex === index ? "scale-110" : "scale-100 hover:scale-110"
													}`}
													style={{ transitionDelay: `${index * 50}ms` }}
												>
													<div
														onMouseMove={() => setCurrentImageIndex(index)}
														className="relative h-full w-full"
														style={{
															background: `url(${image}) center / cover`,
														}}
													></div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
							<div className="relative w-1/2 h-full">
								<div
									ref={setAllTransitionElementsRef}
									style={{ opacity: 0, transform: "translateY(20px)" }}
									className="relative flex items-center justify-between px-6 h-16"
								>
									<div className="relative">
										<div className="relative flex items-center gap-4">
											{/* Move Left Button */}
											<div
												className={`relative h-10 w-12 flex items-center justify-center duration-200 ${
													previousDataExists ? "text-black group cursor-pointer" : "text-gray-400"
												}`}
												onClick={() => {
													if (previousDataExists) {
														handleMoveLeft();
													}
												}}
											>
												<MoveLeft className="relative group-hover:-translate-x-1 group-hover:scale-105 scale-100 duration-200 translate-x-0" />
											</div>

											{/* Move Right Button */}
											<div
												className={`relative h-10 w-12 flex items-center justify-center ${
													nextDataExists ? "text-black group cursor-pointer" : "text-gray-400"
												}`}
												onClick={() => {
													if (nextDataExists) {
														handleMoveRight();
													}
												}}
											>
												<MoveRight className="relative group-hover:translate-x-1 group-hover:scale-105 scale-100 duration-200 translate-x-0" />
											</div>
										</div>
									</div>
									<div className="relative flex items-center justify-center cursor-pointer">
										<div
											onClick={() => {
												hideQuickViewPopUpClickHandler();
											}}
											className="relative group"
										>
											<X size={30} className="relative group-hover:scale-105 scale-100 duration-200 hover:rotate-3" />
										</div>
									</div>
								</div>
								<div
									ref={scrollableDivRef}
									className="relative h-[calc(100%-4rem)] duration-300 w-full px-8 overflow-y-auto overflow-x-hidden"
								>
									<div className="relative h-auto w-full grid gap-4 pb-16">
										<Link
											href={`/shop/${currentQuickViewProduct.category.slug}/${currentQuickViewProduct.id}`}
											ref={setAllTransitionElementsRef}
											style={{ opacity: 0, transform: "translateY(20px)" }}
											className="relative text-5xl font-bold xl:w-4/5 lg:w-4/5 w-full"
										>
											{currentQuickViewProduct.title}
										</Link>
										<div
											ref={setAllTransitionElementsRef}
											style={{ opacity: 0, transform: "translateY(20px)" }}
											className="relative flex items-center gap-y-2 gap-x-4 flex-wrap"
										>
											<div className="relative">
												<RatingsStar currentProduct={currentQuickViewProduct} size={14} color="red" />
											</div>
											<div className="relative text-sm">
												{currentQuickViewProduct.reviews?.length > 0
													? `(${currentQuickViewProduct.reviews.length} customer reviews)`
													: "no reviews"}
											</div>
										</div>
										<div
											ref={setAllTransitionElementsRef}
											style={{ opacity: 0, transform: "translateY(20px)" }}
											className="relative"
										>
											{
												<div className="relative text-3xl font-extrabold font-sans text-gray-800">
													{currentQuickViewProduct.currency}
													{currentQuickViewProduct.price}
												</div>
											}
										</div>
										<div
											ref={setAllTransitionElementsRef}
											style={{ opacity: 0, transform: "translateY(20px)" }}
											className="relative xl:w-4/5 lg:w-4/5 w-full text-gray-700"
											dangerouslySetInnerHTML={{ __html: currentQuickViewProduct.description }}
										></div>
										<div
											ref={setAllTransitionElementsRef}
											style={{ opacity: 0, transform: "translateY(20px)" }}
											className="relative h-auto w-full"
										>
											<div className="relative h-auto w-full grid gap-2">
												<div className="relative h-auto w-full flex-col">
													{!cartItems.some((cartItem) => cartItem.product_id === currentQuickViewProduct.id) && (
														<div className="relative flex flex-col">
															<div className="relative h-auto w-full grid gap-5 pt-4">
																<div className="relative h-auto w-auto flex items-center">
																	<div className="relative h-10 w-24 flex items-center">
																		<div className="relative text-xs uppercase font-bold text-gray-500">Size</div>
																	</div>
																	<div className="relative h-auto w-[calc(100%-6rem)]">
																		<div className="flex gap-2 flex-wrap">
																			{currentQuickViewProduct["sizes"].map((size, index) => (
																				<div
																					key={index}
																					className={`px-4 py-2 text-xs border rounded-md cursor-pointer duration-200 ${
																						selectedSize === size
																							? "bg-gray-800 text-white scale-105"
																							: "bg-transparent hover:bg-gray-100 scale-100"
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
																			{currentQuickViewProduct["colors"].map((color, index) => {
																				return (
																					<div
																						onClick={() => {
																							setCurrentColor(color);
																							setSelectedColor(color.name);
																						}}
																						key={index}
																						className={`relative h-full cursor-pointer ${
																							selectedColor == color.name
																								? "scale-110 shadow-md duration-200 border-none shadow-gray-500"
																								: "scale-100 border border-gray-600"
																						} w-8 rounded`}
																						style={{ background: `${color.name}` }}
																					></div>
																				);
																			})}
																		</div>
																	</div>
																</div>
															</div>
															<div className="relative flex pt-4">
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
																				selectedNumberItems < currentQuickViewProduct.stock
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
														</div>
													)}
													<div className="relative h-auto w-auto flex items-center flex-wrap gap-2 pt-4">
														{cartItems.some((cartItem) => cartItem.product_id === currentQuickViewProduct.id) ? (
															<Button
																variant={"outline"}
																className="select-none"
																onClick={() => {
																	if (user) {
																		removeFromCart(currentQuickViewProduct.id, setCartItems);
																	} else {
																		window.location.pathname = "/auth/login";
																	}
																}}
															>
																<div className="relative">
																	<ShoppingBag size={20} />
																</div>
																<div className="relative text-xs font-bold">Remove From Cart</div>
															</Button>
														) : (
															<Button
																variant={"default"}
																className="select-none"
																onClick={() => {
																	if (user) {
																		addToCart(
																			currentQuickViewProduct.id,
																			setCartItems,
																			selectedNumberItems,
																			selectedColor,
																			selectedSize
																		);
																	} else {
																		window.location.pathname = "/auth/login";
																	}
																}}
															>
																<div className="relative">
																	<ShoppingBag size={20} />
																</div>
																<div className="relative text-xs font-bold">Add To Cart</div>
															</Button>
														)}
														<div className="relative h-auto w-auto flex items-center gap-2">
															<Link href="/checkout/information" className="relative rounded-md">
																<Button variant="default" className="select-none">
																	<div className="relative text-yellow-500">
																		<Zap fill="currentColor" stroke="currentColor" size={20} />
																	</div>
																	<div className="relative text-xs font-bold">Buy Now</div>
																</Button>
															</Link>
														</div>
													</div>
													<div className="relative flex mt-3">
														<div
															onClick={() => {
																if (user) {
																	if (wishList.some((item) => item.product_id === currentQuickViewProduct.id)) {
																		removeFromWishList(currentQuickViewProduct.id, setWishList);
																	} else {
																		addToWishList(currentQuickViewProduct.id, setWishList);
																	}
																} else {
																	window.location.pathname = "/auth/login";
																}
															}}
															className={` select-none text-gray-900 flex items-center gap-2 cursor-pointer group`}
														>
															<Heart
																stroke="currentColor"
																fill={
																	wishList.some((item) => item.product_id === currentQuickViewProduct.id)
																		? "currentColor"
																		: "none"
																}
																size={16}
															/>
															<div className="relative text-sm text-gray-700 group-hover:underline">
																{wishList.some((item) => item.product_id === currentQuickViewProduct.id)
																	? "Remove From WishList"
																	: "Add To Your WishList"}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="relative w-full pt-8">
											<AccordionContentDesignForQuickView currentItemData={currentQuickViewProduct} />
										</div>
										<div className="relative w-full h-auto">
											<div className="relative h-auto w-full pt-6">
												<div className="relative h-auto w-full grid gap-6">
													<div className="relative text-sm text-gray-800" style={{ fontFamily: "afacad-flux" }}>
														Estimated Delivery: 3 days
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
				</div>
			</div>
		</div>
	);
};

export default function QuickViewPopUp({ filteredData }) {
	const { currentQuickViewProduct } = useMainContext();

	return currentQuickViewProduct ? <QuickViewPopUpUi filteredData={filteredData} /> : "";
}
