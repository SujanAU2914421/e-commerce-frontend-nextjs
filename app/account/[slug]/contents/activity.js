import React, { useEffect, useState } from "react";
import CartList from "../component/cartlist";
import Commented from "../component/commented";
import Liked from "../component/liked";
import Orders from "../component/orders";

export default function Activity() {
	const [activeTab, setActiveTab] = useState(null);
	useEffect(() => {
		setActiveTab("orders");
	}, []);
	return (
		<div className="relative h-auto w-full xl:px-20 lg:px-20 md:px-16 sm:px-8 px-4">
			<div className="relative h-auto w-full">
				<div className="relative h-auto w-full grid gap-4">
					<div className="relative h-auto text-xl font-bold">Your Activity</div>
					<div className="relative w-full h-auto">
						<div className="relative h-auto w-full">
							<div className="relative flex items-center text-sm gap-8">
								<div
									onClick={() => {
										setActiveTab("orders");
									}}
									className={`relative h-8 cursor-pointer w-auto group ${
										activeTab == "orders" && "font-bold"
									} flex items-center`}
								>
									<div className="relative">Orders</div>
									<div
										className={`absolute bottom-0 left-0 bg-black ${
											activeTab == "orders" ? "w-2/3" : " group-hover:w-2/3 w-0"
										} h-[2px] rounded-full duration-200`}
									></div>
								</div>
								<div
									onClick={() => {
										setActiveTab("cart");
									}}
									className={`relative h-8 cursor-pointer w-auto group ${
										activeTab == "cart" && "font-bold"
									} flex items-center`}
								>
									<div className="relative">Cart</div>
									<div
										className={`absolute bottom-0 left-0 bg-black ${
											activeTab == "cart" ? "w-2/3" : " group-hover:w-2/3 w-0"
										} h-[2px] rounded-full duration-200`}
									></div>
								</div>
								<div
									onClick={() => {
										setActiveTab("commented");
									}}
									className={`relative h-8 cursor-pointer w-auto group ${
										activeTab == "commented" && "font-bold"
									} flex items-center`}
								>
									<div className="relative">Commented</div>
									<div
										className={`absolute bottom-0 left-0 bg-black ${
											activeTab == "commented"
												? "w-2/3"
												: " group-hover:w-2/3 w-0"
										} h-[2px] rounded-full duration-200`}
									></div>
								</div>
								<div
									onClick={() => {
										setActiveTab("liked");
									}}
									className={`relative h-8 cursor-pointer w-auto group ${
										activeTab == "liked" && "font-bold"
									} flex items-center`}
								>
									<div className="relative">Liked</div>
									<div
										className={`absolute bottom-0 left-0 bg-black ${
											activeTab == "liked" ? "w-2/3" : " group-hover:w-2/3 w-0"
										} h-[2px] rounded-full duration-200`}
									></div>
								</div>
							</div>
							<div className="relative h-auto w-full">
								{activeTab === "orders" ? (
									<Orders />
								) : activeTab === "cart" ? (
									<CartList />
								) : activeTab === "commented" ? (
									<Commented />
								) : (
									activeTab === "liked" && <Liked />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
