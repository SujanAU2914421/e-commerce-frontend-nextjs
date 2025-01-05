"use client";

import React, { useEffect } from "react";
import { useMainContext } from "@/contexts/MainContext";
import Contents from "./components/contents";
import ShopNavbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function Home() {
	const {
		categories,
		shopCurrentCategory,
		setShopCurrentCategory,
		allProducts,
		currentQuickViewProduct,
		setCurrentQuickViewProduct,
	} = useMainContext();
	return (
		<div
			className="relative h-screen w-screen overflow-hidden"
			style={{ fontFamily: "afacad-flux" }}
		>
			<div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
				<div className="relative h-auto w-full">
					<div className="relative min-h-screen h-auto w-full">
						<div className="sticky top-0 z-10 bg-white h-auto w-full">
							<ShopNavbar
								categories={categories}
								shopCurrentCategory={shopCurrentCategory}
								setShopCurrentCategory={setShopCurrentCategory}
							/>
						</div>
						<div className="relative h-auto w-full px-8">
							<Contents
								categories={categories}
								shopCurrentCategory={shopCurrentCategory}
								setShopCurrentCategory={setShopCurrentCategory}
								allProducts={allProducts}
								currentQuickViewProduct={currentQuickViewProduct}
								setCurrentQuickViewProduct={setCurrentQuickViewProduct}
							/>
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
