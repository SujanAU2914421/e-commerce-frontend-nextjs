import React from "react";

export default function OrdersList({
	orders,
	currentOrderViewIndex,
	setCurrentOrderViewIndex,
	viewingOrder,
	setViewingOrder,
}) {
	return (
		<div className="relative h-auto xl:w-[calc(100vw-25rem)] lg:w-[calc(100vw-25rem)] md:w-[calc(100vw-20rem)] sm:w-[calc(100vw-23rem)] w-[calc(100vw-20rem)] overflow-x-auto pt-6 afacad-flux">
			<div className="relative h-auto w-auto">
				<div className="relative h-auto w-full grid gap-6">
					{/* Table Header */}
					<div className="relative h-10 bg-gray-100 flex items-center text-gray-700 text-sm font-medium">
						<div className="relative h-10 w-20 flex items-center justify-center">
							SN
						</div>

						<div className="relative h-auto w-72 flex">Name</div>
						<div className="relative h-auto w-40 flex">Price</div>
						<div className="relative h-auto w-56 flex">Status</div>
						<div className="relative h-auto w-64 flex">Date</div>
					</div>
					<div className="relative h-auto w-full grid gap-3">
						{/* Orders List */}
						{orders.map((order, index) => (
							<div
								key={order.id}
								className={`relative h-10 flex items-center w-full hover:bg-gray-100 ${
									currentOrderViewIndex == index && "bg-gray-100"
								} cursor-pointer rounded-l-md`}
								onClick={() => {
									setCurrentOrderViewIndex(index);
									setViewingOrder(true);
								}}
							>
								<div className="relative text-gray-600 font-medium">
									<div className="relative h-10 w-20 flex items-center justify-center">
										{index + 1}
									</div>
								</div>
								<div className="relative h-auto w-72 flex text-sm text-gray-700">
									{order.name}
								</div>
								<div className="relative h-auto w-40 flex text-sm text-gray-700">
									${order.total}
								</div>
								<div className="relative h-auto w-56 flex">
									<div
										className={`relative py-1 px-3 ${
											order.status === "Cancelled"
												? "bg-red-100 text-red-500"
												: order.status === "Shipped"
												? "bg-blue-100 text-blue-500"
												: order.status === "Delivered"
												? "bg-green-100 text-green-500"
												: ""
										} rounded-md text-xs font-medium`}
									>
										{order.status}
									</div>
								</div>

								<div className="relative h-auto w-64 flex font-sans text-xs text-gray-700">
									{order.orderDate}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
