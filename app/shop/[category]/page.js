"use client";

import React, { useEffect } from "react";
import Contents from "../components/contents";
import ShopNavbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function Home() {
	return (
		<div className="relative h-screen w-screen overflow-hidden" style={{ fontFamily: "afacad-flux" }}>
			<div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
				<div className="relative h-auto w-full">
					<div className="relative min-h-screen h-auto w-full">
						<div className="h-auto w-full sticky top-0 bg-white z-50">
							<ShopNavbar />
						</div>
						<div className="relative w-full flex justify-center h-auto">
							<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
								<Contents />
							</div>
						</div>
					</div>
					<div className="relative">
						<Footer />
					</div>
				</div>
			</div>
		</div>
	);
}
