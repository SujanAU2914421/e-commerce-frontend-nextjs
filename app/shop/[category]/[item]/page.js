"use client";

import React, { useEffect, useMemo } from "react";
import { useMainContext } from "@/contexts/MainContext";
import Content from "./component/content";
import { usePathname } from "next/navigation";
import ShopNavbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function CheckOut() {
	const {
		shopCurrentCategory,
		setShopCurrentCategory,
		allProducts,
		currentQuickViewProduct,
		setCurrentQuickViewProduct,
		photoView,
		setPhotoView,
	} = useMainContext();

	const pathname = usePathname(); // Get the current pathname
	const pathSegments = pathname.split("/"); // Split the path into segments
	const productId = pathSegments[3]; // Extract the product ID

	// Find the product with the matching ID in the allProducts array
	const currentItemData = useMemo(() => {
		console.log("Finding product with ID: ", productId);

		return allProducts?.find((product) => product.id === productId) || allProducts[0];
	}, [allProducts, productId]);

	return (
		<div className="relative h-screen w-screen overflow-hidden" style={{ fontFamily: "afacad-flux" }}>
			<div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
				<div className="relative h-auto w-full">
					<div className="relative h-auto w-full">
						<div className="relative h-auto w-full">
							<div className="sticky top-0 bg-white z-50 h-auto">
								<ShopNavbar />
							</div>
							<div className="relative h-auto w-full">
								<Content
									shopCurrentCategory={shopCurrentCategory}
									setShopCurrentCategory={setShopCurrentCategory}
									currentItemData={currentItemData}
									allProducts={allProducts}
									currentQuickViewProduct={currentQuickViewProduct}
									setCurrentQuickViewProduct={setCurrentQuickViewProduct}
									photoView={photoView}
									setPhotoView={setPhotoView}
								/>
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
