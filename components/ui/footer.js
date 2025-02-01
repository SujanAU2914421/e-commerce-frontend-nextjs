import React from "react";
import { Button } from "./button";

export default function Footer() {
	return (
		<div className="relative w-full h-auto pt-16" style={{ fontFamily: "afacad-flux" }}>
			<div className="relative h-auto w-full border-t flex justify-center">
				<div className="relative w-full h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw] pt-16 pb-32 flex-col space-y-4">
					<div className="relative w-full h-auto flex xl:flex-nowrap lg:flex-nowrap flex-wrap-reverse gap-y-16">
						<div className="relative h-auto xl:w-2/5 lg:w-2/5 w-full grid gap-8">
							<div className="relative text-gray-600">Kathmandu, Imadol postal code - 44705, Nepal</div>
							<div className="relative grid gap-4">
								<div className="relative flex items-center gap-2">
									<div className="relative text-sm">Contact: </div>
									<div className="relative font-bold text-sm text-gray-700">figpic@gmail.com</div>
								</div>
								<div className="relative text-sm font-bold text-gray-700">(+977) 9815061114</div>
							</div>
						</div>
						<div className="relative xl:w-3/5 lg:w-3/5 w-full flex flex-wrap gap-y-16">
							<div className="relative xl:w-2/6 lg:w-2/6 md:w-2/6 sm:w-2/6 w-full flex flex-col space-y-4">
								<div className="relative font-bold text-gray-800 text-xl">Shop</div>
								<div className="relative text-gray-700 flex-col flex space-y-4 text-sm">
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											New Arrivals
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											Wish List
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											Cart
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											Refund and Exchanges
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
								</div>
							</div>
							<div className="relative xl:w-2/6 lg:w-2/6 md:w-2/6 sm:w-2/6 w-full flex flex-col space-y-4">
								<div className="relative font-bold text-gray-800 text-xl">Help</div>
								<div className="relative text-gray-700 flex-col flex space-y-4 text-sm">
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											FAQs
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											Refund and Exchanges
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											Privacy Policy
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
									<div className="relative flex">
										<div className="relative hover:font-bold group cursor-pointer">
											Terms & Conditions
											<div
												className={`absolute -bottom-1 w-0 group-hover:w-3/5 duration-300 h-[2px] rounded-full bg-gray-600`}
											></div>
										</div>
									</div>
								</div>
							</div>
							<div className="relative xl:w-2/6 lg:w-2/6 md:w-2/6 sm:w-2/6 w-full flex flex-col space-y-4">
								<div className="relative font-bold text-gray-800 text-xl">Subscribe</div>
								<div className="relative text-gray-500 text-xs">
									Subscribe to get the latest News about products lunch and more.
								</div>
								<form
									onSubmit={(e) => {
										e.preventDefault();
									}}
									className="relative text-gray-700 flex-col flex space-y-4 text-sm"
								>
									<input
										type="text"
										className="relative h-10 w-full rounded-md border px-3 outline-0 focus:outline-1"
										placeholder="Email"
									/>
									<div className="relative flex justify-start">
										<Button size="sm">Submit</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="relative text-gray-700">&#169; 2024 figPic. All rights reserved.</div>
				</div>
			</div>
		</div>
	);
}
