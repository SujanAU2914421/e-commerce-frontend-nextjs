"use client";
import React, { useEffect } from "react";

export default function AccountPageMain() {
	useEffect(() => {
		// Replace the current route with /account/profile to simulate SPA navigation
		window.location.replace("/account/profile");
	}, []);

	return (
		<div className="relative h-screen w-screen flex items-center justify-center">
			Redirecting...
		</div>
	);
}
