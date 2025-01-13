"use client";
import ShopNavbar from "@/components/ui/navbar";
import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";

export default function OrdersPage() {
	const { user } = useAuthContext();

	return user ? (
		<div className="relative h-screen w-screen overflow-x-hidden overflow-y-auto">
			<div className="sticky left-0 top-0 z-20 bg-white" style={{ fontFamily: "outfit" }}>
				<ShopNavbar />
			</div>
		</div>
	) : (
		"Login to view"
	);
}
