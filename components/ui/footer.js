import React from "react";

export default function Footer() {
	return (
		<div className="relative w-full h-auto pt-16">
			<div className="relative w-full h-auto xl:px-32 lg:px-32 md:px-16 sm:px-8 px-4 pt-16 pb-16 grid gap-8 border-t">
				<div className="relative w-full h-auto flex xl:flex-nowrap lg:flex-nowrap flex-wrap-reverse gap-y-16">
					<div className="relative h-auto xl:w-2/5 lg:w-2/5 w-full grid gap-8">
						<div className="relative text-gray-600">
							Kathmandu, Imadol postal code - 44705, Nepal
						</div>
						<div className="relative grid gap-4">
							<div className="relative flex items-center gap-2">
								<div className="relative text-sm">Contact: </div>
								<div className="relative font-bold text-sm text-gray-700">
									figpic@gmail.com
								</div>
							</div>
							<div className="relative text-sm font-bold text-gray-700">
								(+977) 9815061114
							</div>
						</div>
					</div>
					<div className="relative xl:w-3/5 lg:w-3/5 w-full flex flex-wrap gap-y-16">
						<div className="relative xl:w-2/5 lg:w-2/5 md:w-2/5 sm:w-2/5 w-full flex flex-col gap-4">
							<div className="relative font-bold text-gray-800 text-xl">
								Shop
							</div>
							<div className="relative text-gray-600 flex-col flex gap-2">
								<div className="relative">New Arrivals</div>
								<div className="relative">Wish List</div>
								<div className="relative">Cart</div>
								<div className="relative">Refund and Exchanges</div>
							</div>
						</div>
						<div className="relative xl:w-2/5 lg:w-2/5 md:w-2/5 sm:w-2/5 w-full flex flex-col gap-4">
							<div className="relative font-bold text-gray-800 text-xl">
								Help
							</div>
							<div className="relative text-gray-600 flex-col flex gap-2">
								<div className="relative">FAQs</div>
								<div className="relative">Refund and Exchanges</div>
								<div className="relative">Privacy Policy</div>
								<div className="relative">Terms & Conditions</div>
							</div>
						</div>
						<div className="relative xl:w-1/5 lg:w-1/5 md:w-1/5 sm:w-1/5 w-full flex flex-col gap-4">
							<div className="relative font-bold text-gray-800 text-xl">
								About
							</div>
							<div className="relative text-gray-600 flex-col flex gap-2">
								<div className="relative">Contact</div>
								<div className="relative">About Us</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative text-gray-700">
					&#169; 2024 figPic. All rights reserved.
				</div>
			</div>
		</div>
	);
}
