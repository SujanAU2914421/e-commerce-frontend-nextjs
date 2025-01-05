import React from "react";

export default function OrderView({
	item,
	currentOrderViewIndex,
	setCurrentOrderViewIndex,
	viewingOrder,
	setViewingOrder,
}) {
	return (
		<div className="fixed h-screen w-screen z-10 top-0 left-0 bg-black/10 flex justify-end">
			<div
				className="absolute top-0 left-0 h-screen w-screen"
				onClick={() => {
					setViewingOrder(false);
					setCurrentOrderViewIndex(null);
				}}
			></div>
			<div className="relative h-screen w-[30rem] p-4">
				<div className="relative h-full w-full bg-white overflow-y-auto overflow-x-hidden rounded-md">
					<div className="relative h-auto w-full grid gap-8 pb-16">
						<div className="relative w-full flex justify-between pl-8 pr-4 pt-5">
							<div className="relative grid gap-3">
								<div className="relative font-bold text-normal text-gray-700">
									{item.name}
								</div>
								<div className="relative text-xs text-gray-500 leading-5 tracking-wide max-w-[80%]">
									{item.description}
								</div>
							</div>
							<div
								onClick={() => {
									setViewingOrder(false);
									setCurrentOrderViewIndex(null);
								}}
								className="relative cursor-pointer"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</div>
						</div>
						<div className="relative border-t w-full h-auto pt-4">
							<div className="relative w-full h-auto grid gap-5 font-sans">
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Order Date
									</div>
									<div className="relative w-1/2 text-xs font-bold text-gray-800">
										{item.orderDate}
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Delivery Service
									</div>
									<div className="relative w-1/2 text-xs font-bold text-gray-800">
										{item.deliveryService}
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Payment Method
									</div>
									<div className="relative w-1/2 text-xs font-bold text-gray-800">
										{item.paymentMethod}
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Status
									</div>
									<div className="relative w-1/2 text-xs font-bold flex">
										<div
											className={`relative py-1 px-3 rounded-md ${
												item.status === "Cancelled"
													? "bg-red-100 text-red-600"
													: item.status === "Delivered"
													? "bg-green-100 text-green-600"
													: item.status === "Shipped"
													? "bg-blue-100 text-blue-600"
													: ""
											}`}
										>
											{item.status}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="relative border-t w-full h-auto pt-4">
							<div className="relative w-full h-auto grid gap-5">
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Payment
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Piecess
									</div>
									<div className="relative w-1/2 text-sm font-bold afacad-flux text-gray-800">
										{item.pieces}
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Cost Per Piece
									</div>
									<div className="relative w-1/2 text-sm font-bold afacad-flux text-gray-800">
										${item.costPerPiece}
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Transaction Fee
									</div>
									<div className="relative w-1/2 text-sm font-bold afacad-flux text-gray-800">
										${item.transactionFee}
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Delivery Fee
									</div>
									<div className="relative w-1/2 text-sm font-bold afacad-flux text-gray-800">
										${item.deliveryFee}
									</div>
								</div>
								<div className="relative h-auto w-full flex items-center px-8">
									<div className="relative w-1/2 text-sm font-medium text-gray-600">
										Total
									</div>
									<div className="relative w-1/2 text-sm font-bold afacad-flux text-gray-800">
										$
										{item.costPerPiece + item.transactionFee + item.deliveryFee}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
