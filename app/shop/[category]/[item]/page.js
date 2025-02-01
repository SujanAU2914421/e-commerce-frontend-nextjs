"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMainContext } from "@/contexts/MainContext";
import Content from "./component/content";
import { usePathname } from "next/navigation";
import ShopNavbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CheckOut() {
	const { currentItemData, getProduct } = useMainContext();

	const pathname = usePathname(); // Get the current pathname
	const pathSegments = pathname.split("/"); // Split the path into segments
	const productId = pathSegments[3]; // Extract the product ID
	useEffect(() => {
		getProduct(productId);
	}, []);

	return (
		<div
			className="relative h-screen w-screen overflow-hidden"
			style={{ fontFamily: "afacad-flux" }}
		>
			<div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
				<div className="relative h-auto w-full">
					<div className="relative h-auto w-full">
						<div className="relative h-auto w-full">
							<div className="sticky top-0 bg-white z-50 h-auto">
								<ShopNavbar />
							</div>
							<div className="relative h-auto w-full">
								{currentItemData && <Content />}
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
