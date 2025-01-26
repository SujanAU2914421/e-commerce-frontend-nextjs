import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import React from "react";

export default function Profile() {
	const { logout } = useAuthContext();

	return (
		<div className="relative h-auto w-full afacad-sans">
			<div className="relative h-auto w-full px-20 pb-16 grid gap-16">
				<div className="relative h-auto w-full grid gap-4">
					<div className="relative h-auto w-full grid gap-7">
						<div className="relative font-bold text-xl">Profile</div>
						<div className="relative text-xs text-gray-700">Personal Information</div>
					</div>
					<div className="relative h-auto w-full border-t pt-4">
						<div className="relative h-auto w-full grid grid-cols-3 gap-8">
							<div className="relative col-span-1">
								<div className="relative text-xs text-gray-600 font-sans leading-5">
									Please note that your updated first name and last name will be visible to other users.
								</div>
							</div>
							<div className="relative col-span-2">
								<div className="relative h-auto w-auto">
									<div className="relative h-auto w-auto grid gap-8">
										<div className="relative h-auto w-auto flex items-center gap-4">
											<div className="relative h-auto w-auto grid gap-2">
												<div className="relative h-auto text-xs font-bold text-gray-500">First Name</div>
												<div className="relative h-auto w-auto">
													<div className="relative h-10 w-56 border rounded-md overflow-hidden">
														<input
															type="text"
															className="relative h-full w-full outline-none border-none text-xs px-4 font-bold"
															placeholder="Sujan"
														/>
													</div>
												</div>
											</div>
											<div className="relative h-auto w-auto grid gap-2">
												<div className="relative h-auto text-xs font-bold text-gray-500">Last Name</div>
												<div className="relative h-auto w-auto">
													<div className="relative h-10 w-56 border rounded-md overflow-hidden">
														<input
															type="text"
															className="relative h-full w-full outline-none border-none text-xs px-4 font-bold"
															placeholder="Limbu"
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="relative h-auto w-auto grid gap-2">
											<div className="relative h-auto text-xs font-bold text-gray-500">Phone Number</div>
											<div className="relative h-auto w-auto">
												<div className="relative h-10 w-56 border rounded-md overflow-hidden">
													<input
														type="number"
														className="relative h-full w-full outline-none border-none text-xs px-4 font-bold"
														placeholder="9815061114"
													/>
												</div>
											</div>
										</div>
										<div className="relative h-auto w-auto">
											<div className="relative h-10 w-56 bg-gray-800 cursor-pointer shadow-sm shadow-gray-800 text-white flex items-center justify-center rounded-md text-sm font-bold">
												Change
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative h-auto w-full grid gap-4">
					<div className="relative h-auto w-full grid gap-7">
						<div className="relative text-xs text-gray-700">Email</div>
					</div>
					<div className="relative h-auto w-full border-t pt-4">
						<div className="relative h-auto w-full grid grid-cols-3 gap-8">
							<div className="relative col-span-1">
								<div className="relative text-xs text-gray-600 font-sans leading-5">
									Note: email address is very important information. so be careful while choosing one.
								</div>
							</div>
							<div className="relative col-span-2">
								<div className="relative h-auto w-auto">
									<div className="relative h-auto w-auto grid gap-4">
										<div className="relative h-auto w-auto grid gap-2">
											<div className="relative h-auto text-xs font-bold text-gray-500">Email Address</div>
											<div className="relative h-auto w-auto">
												<div className="relative h-10 w-72 border rounded-md overflow-hidden">
													<input
														type="email"
														className="relative h-full w-full outline-none border-none text-xs px-4 font-bold"
														placeholder="gusionlimbu9@gmail.com"
													/>
												</div>
											</div>
										</div>
										<div className="relative h-auto w-auto">
											<div className="relative h-10 w-56 bg-gray-800 cursor-pointer shadow-sm shadow-gray-800 text-white flex items-center justify-center rounded-md text-sm font-bold">
												Change
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="relative h-auto w-full">
					<div
						onClick={() => {
							logout();
						}}
						className="relative h-10 w-56 bg-red-600 shadow-sm shadow-red-600 cursor-pointer text-white flex items-center justify-center rounded-md text-xs font-bold"
					>
						Logout
					</div>
				</div>
			</div>
		</div>
	);
}
