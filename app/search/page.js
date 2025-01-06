"use client";
import { Button } from "@/components/ui/button";
import ShopNavbar from "@/components/ui/navbar";
import { ChevronLeft } from "lucide-react/dist/cjs/lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SearchPageUi() {
	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};
	return (
		<div
			className="relative h-screen w-screen"
			style={{ fontFamily: "afacad-flux" }}
		>
			<div className="relative">
				<ShopNavbar />
			</div>
			<div className="relative h-auto w-full bg-white flex items-center justify-center pt-8 pb-4">
				<div className="relative h-auto xl:w-[50vw] lg:w-[50vw] md:w-[70vw] sm:w-[80vw] w-full px-4">
					<div className="relative flex flex-col gap-8">
						<div className="relative flex">
							<div
								onClick={handleGoBack}
								className="relative text-sm text-gray-700 flex items-center gap-4 hover:text-gray-700 hover:font-bold cursor-pointer"
							>
								<ChevronLeft size={14} />
								<div className="relative">Go Back</div>
							</div>
						</div>
						<div className="relative flex flex-col gap-4">
							<div className="relative flex flex-col gap-4">
								<div className="relative text-sm text-gray-700">
									Search for your favorite clothing items.
								</div>
								<div className="relative w-full h-auto flex items-center gap-4">
									<div className="relative h-auto w-full">
										<input
											type="text"
											className="relative h-9 w-full outline-1 outline-gray-300 border-gray-300 border rounded-md text-sm px-4 font-medium"
											placeholder="Enter detail"
										/>
									</div>
									<Button>Search</Button>
								</div>
							</div>

							<div className="relative flex flex-col gap-2">
								<div className="relative text-gray-700">
									Showing Results For:{" "}
									<span className="relative font-bold text-xl text-gray-700">
										Hoodies
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="relative flex justify-center pt-32 text-xl text-gray-700">
						Ops! No Products with given information.
					</div>
				</div>
			</div>
		</div>
	);
}
