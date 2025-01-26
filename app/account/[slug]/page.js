"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SideNavBar from "../component/sideNavBar";
import Profile from "./contents/profile";
import OrdersUiPage from "./contents/orders";

export default function AccountPage() {
	const pathname = usePathname(); // Get the current pathname
	return (
		<div className="relative h-screen w-screen overflow-hidden" style={{ fontFamily: "afacad-flux" }}>
			<div className="relative h-full w-full overflow-y-auto px-4">
				<div className="relative h-full w-full">
					<div className="relative h-full w-full">
						<div className="relative w-full h-full flex">
							<div className="relative h-auto w-[15rem] flex flex-col gap-8">
								<SideNavBar />
							</div>
							<div className="relative h-full w-[calc(100%-15rem)] overflow-y-auto overflow-x-hidden">
								<div className="relative h-auto w-full pb-16 pt-10">
									{pathname.split("/")[2] === "profile" ? (
										<Profile />
									) : pathname.split("/")[2] === "orders" ? (
										<OrdersUiPage />
									) : pathname.split("/")[2] === "activity" ? (
										"sdlsld"
									) : pathname.split("/")[2] === "purchase-details" ? (
										<div>Purchase Details</div>
									) : pathname.split("/")[2] === "settings" ? (
										<div>Settings</div>
									) : (
										<div className="relative h-full w-full flex text-xl items-center justify-center">No content</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
