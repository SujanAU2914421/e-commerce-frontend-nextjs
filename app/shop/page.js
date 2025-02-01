"use client";
import React, { useEffect } from "react";

export default function ShopRedirect() {
	useEffect(() => {
		window.location.replace("/shop/all");
	}, []);

	return <div className="relative h-screen w-screen flex items-center justify-center">Redirecting...</div>;
}
