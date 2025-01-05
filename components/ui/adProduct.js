import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AdProduct({ adProduct }) {
	return (
		<div className="relative w-full h-auto">
			<div className="relative h-auto w-full">
				<div className="relative w-full flex flex-wrap-reverse gap-y-4 h-full items-center">
					<div className="relative xl:w-2/5 lg:w-2/5 w-full xl:px-0 lg:px-0 md:px-8 sm:px-8 px-4">
						<div className="relative grid gap-8 text-gray-600 py-4">
							<div className="relative grid gap-4">
								<div className="relative text-sm font-medium flex xl:justify-start lg:justify-start justify-center items-center gap-2">
									<div>
										<svg width="20" height="20" viewBox="0 0 24 24" id="search">
											<path
												fill="currentColor"
												stroke="currentColor"
												d="M19.7555474,18.6065254 L16.3181544,15.2458256 L16.3181544,15.2458256 L16.2375905,15.1233001 C16.0877892,14.9741632 15.8829641,14.8901502 15.6691675,14.8901502 C15.4553709,14.8901502 15.2505458,14.9741632 15.1007444,15.1233001 L15.1007444,15.1233001 C12.1794834,17.8033337 7.6781476,17.94901 4.58200492,15.4637171 C1.48586224,12.9784243 0.75566836,8.63336673 2.87568494,5.31016931 C4.99570152,1.9869719 9.30807195,0.716847023 12.9528494,2.34213643 C16.5976268,3.96742583 18.4438102,7.98379036 17.2670181,11.7275931 C17.182269,11.9980548 17.25154,12.2921761 17.4487374,12.4991642 C17.6459348,12.7061524 17.9410995,12.794561 18.223046,12.7310875 C18.5049924,12.667614 18.7308862,12.4619014 18.8156353,12.1914397 L18.8156353,12.1914397 C20.2223941,7.74864367 18.0977423,2.96755391 13.8161172,0.941057725 C9.53449216,-1.08543846 4.38083811,0.250823958 1.68905427,4.08541671 C-1.00272957,7.92000947 -0.424820906,13.1021457 3.0489311,16.2795011 C6.5226831,19.4568565 11.8497823,19.6758854 15.5841278,16.7948982 L18.6276529,19.7705177 C18.9419864,20.0764941 19.4501654,20.0764941 19.764499,19.7705177 C20.0785003,19.4602048 20.0785003,18.9605974 19.764499,18.6502845 L19.764499,18.6502845 L19.7555474,18.6065254 Z"
												transform="translate(2 2)"
											></path>
										</svg>
									</div>
									<div className="relative">Searching for combo?</div>
								</div>
								<div className="relative text-3xl font-medium leading-[2rem] flex xl:justify-start lg:justify-start justify-center">
									{adProduct.name}
								</div>
							</div>
							<div className="relative flex xl:justify-start lg:justify-start justify-center items-center gap-6">
								<Link
									href={`shop/${adProduct.category}/${adProduct.id}`}
									className="relative flex h-10 bg-gray-800 text-gray-200 rounded-md px-8 text-sm items-center justify-center"
								>
									<div className="relative flex items-center gap-4">
										<div className="relative font-bold text-xs">
											Check it out
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
					<div className="relative xl:w-3/5 lg:w-3/5 md:w-[100vw] sm:w-[100vw] w-full xl:h-[calc(80vh)] lg:h-[calc(80vh)] h-96">
						<div className="relative h-full w-full flex justify-end">
							<div
								className="relative h-full w-full"
								style={{
									background: `url(${
										adProduct?.images[0]
											? adProduct.images[0]
											: adProduct?.colors[0]?.images[0]
									}) center / contain no-repeat`,
								}}
							></div>
							<div className="absolute xl:hidden lg:hidden z-10 bottom-0 w-full left-0 h-8 bg-gradient-to-t from-primary-foreground to-transparent"></div>
							<div className="absolute shadow-xl bottom-[60%] left-[4%] z-20 bg-white rounded-full h-32 w-32 flex items-center justify-center">
								<div className="relative grid gap-1">
									<div className="relative text-center text-sm text-gray-500">
										Just In
									</div>
									<div className="relative font-bold text-3xl text-gray-800 text-center">
										$
										{adProduct.price.toFixed() -
											(adProduct.price * adProduct.discountPercent) / 100}
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
