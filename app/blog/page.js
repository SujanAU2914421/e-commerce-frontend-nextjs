"use client";
import React from "react";
import Navbar from "../../components/ui/landingPageNavbar";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Blog() {
	const { logout } = useAuthContext();
	return (
		<div className="relative h-screen w-screen overflow-y-auto overflow-x-hidden">
			<div className="relative px-40">
				<Navbar />
			</div>
			<div className="relative h-screen w-screen flex items-center justify-center">
				<div className="relative grid gap-4">
					page
					<div
						onClick={() => {
							logout();
						}}
						className="relative flex items-center justify-center text-xs font-medium cursor-pointer h-8 w-40 rounded bg-black text-white"
					>
						Logout
					</div>
				</div>
			</div>
		</div>
	);
}
