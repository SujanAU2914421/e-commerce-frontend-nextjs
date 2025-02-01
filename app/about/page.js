"use client";

import React from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import Navbar from "../../components/landingPageNavbar";
import Footer from "@/components/footer";
import { Grid, Headset, Lock, Percent, Truck } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
	return (
		<div
			className="relative h-auto w-full overflow-y-auto scroll-smooth overflow-x-hidden"
			style={{ fontFamily: "afacad-flux" }}
		>
			<div className="relative h-auto w-full flex justify-center">
				<div className="relative h-auto xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
					<div className="sticky top-0 h-auto w-full z-50 bg-white">
						<Navbar />
					</div>
					<div className="relative h-auto w-full py-16 flex-col space-y-32">
						<div className="w-full flex items-center">
							<div className="w-1/2">
								<div className="font-bold text-5xl text-gray-800">
									About Us
								</div>
								<div className="relative w-full flex">
									<div className="text-normal leading-6 pt-4 text-gray-500 w-4/5">
										We are FigPic, a team of passionate
										individuals committed to providing you
										with high-quality products and a
										seamless shopping experience.
									</div>
								</div>
							</div>
							<div className="relative h-auto w-1/2">
								<div
									className="relative h-[25rem] w-full rounded-xl"
									style={{
										background: `url(https://plus.unsplash.com/premium_photo-1675107358280-5c82ea9e169f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center / cover`,
									}}
								></div>
							</div>
						</div>
						<div
							className="relative h-auto w-full pt-16 flex-col space-y-10"
							id="services"
						>
							<div className="w-full">
								<div className="font-bold text-5xl text-center text-gray-800">
									Our Services
								</div>
							</div>
							<div className="relative h-auto flex justify-center gap-6 flex-wrap">
								<div className="relative h-auto py-8 w-72 flex-col bg-gray-100 rounded-xl space-y-5 px-8">
									<div className="relative flex w-full items-center justify-center text-gray-800">
										<Grid size={24} />
									</div>
									<div className="relative h-auto w-full flex-col space-y-2">
										<div className="relative text-center text-xl font-bold text-gray-700">
											Product Variety
										</div>
										<div className="relative text-center text-gray-600">
											A diverse range of high-quality
											products for all needs.
										</div>
									</div>
								</div>
								<div className="relative h-auto py-8 w-72 flex-col bg-gray-100 rounded-xl space-y-5 px-8">
									<div className="relative flex w-full items-center justify-center text-gray-800">
										<Lock size={24} />
									</div>
									<div className="relative h-auto w-full flex-col space-y-2">
										<div className="relative text-center text-xl font-bold text-gray-700">
											Fast & Secure Checkout
										</div>
										<div className="relative text-center text-gray-600">
											Quick and safe shopping experience
											every time.
										</div>
									</div>
								</div>
								<div className="relative h-auto py-8 w-72 flex-col bg-gray-100 rounded-xl space-y-5 px-8">
									<div className="relative flex w-full items-center justify-center text-gray-800">
										<Truck size={24} />
									</div>
									<div className="relative h-auto w-full flex-col space-y-2">
										<div className="relative text-center text-xl font-bold text-gray-700">
											Free & Reliable Delivery
										</div>
										<div className="relative text-center text-gray-600">
											Get your orders delivered for free,
											quickly, and with full reliability.
										</div>
									</div>
								</div>
								<div className="relative h-auto py-8 w-72 flex-col bg-gray-100 rounded-xl space-y-5 px-8">
									<div className="relative flex w-full items-center justify-center text-gray-800">
										<Headset size={24} />
									</div>
									<div className="relative h-auto w-full flex-col space-y-2">
										<div className="relative text-center text-xl font-bold text-gray-700">
											Customer Support
										</div>
										<div className="relative text-center text-gray-600">
											Available anytime to assist you with
											any queries.
										</div>
									</div>
								</div>
								<div className="relative h-auto py-8 w-72 flex-col bg-gray-100 rounded-xl space-y-5 px-8">
									<div className="relative flex w-full items-center justify-center text-gray-800">
										<Percent size={24} />
									</div>
									<div className="relative h-auto w-full flex-col space-y-2">
										<div className="relative text-center text-xl font-bold text-gray-700">
											Exclusive Discounts
										</div>
										<div className="relative text-center text-gray-600">
											Access regular discounts and
											exclusive offers to get the best
											deals.
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full flex items-center">
							<div className="relative h-auto w-1/2">
								<div
									className="relative h-[25rem] w-full rounded-xl"
									style={{
										background: `url(https://i.pinimg.com/1200x/db/aa/55/dbaa55f8166e6e9d2502b16f2d81e8fc.jpg) center / cover`,
									}}
								></div>
							</div>
							<div className="w-1/2 xl:pl-16 lg:pl-16 md:pl-16 pl-0">
								<div className="font-bold text-5xl text-gray-800">
									Our Vision/Mission
								</div>
								<div className="relative w-full flex">
									<div className="text-normal leading-6 pt-4 text-gray-500 w-4/5">
										At FigPic, our mission is to provide
										high-quality products and exceptional
										customer service while making shopping
										enjoyable for everyone.
									</div>
								</div>
							</div>
						</div>

						<div className="relative w-full h-auto flex-col space-y-8">
							<div className="font-bold text-5xl text-center text-gray-800">
								FAQ
							</div>

							<div className="relative w-full flex justify-center">
								<div className="relative w-[40rem]">
									<Accordion
										type="multiple"
										className="w-full"
									>
										<AccordionItem value="item-1">
											<AccordionTrigger>
												<div className="relative text-gray-800 text-xl">
													What is FigPic?
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className="relative text-gray-800 text-base pb-8 pt-4">
													FigPic is an online
													e-commerce platform offering
													a wide range of products at
													great prices.
												</div>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-2">
											<AccordionTrigger>
												<div className="relative text-gray-800 text-xl">
													How can I track my order?
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className="relative text-gray-800 text-base pb-8 pt-4">
													Once your order is shipped,
													you`ll receive a tracking
													number via email to monitor
													its progress.
												</div>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-3">
											<AccordionTrigger>
												<div className="relative text-gray-800 text-xl">
													What payment methods do you
													accept?
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className="relative text-gray-800 text-base pb-8 pt-4">
													We accept major credit and
													debit cards, as well as
													PayPal for secure
													transactions.
												</div>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-4">
											<AccordionTrigger>
												<div className="relative text-gray-800 text-xl">
													Can I return an item?
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className="relative text-gray-800 text-base pb-8 pt-4">
													Yes, we offer a 30-day
													return policy for most
													items. Please check our
													return policy for details.
												</div>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-5">
											<AccordionTrigger>
												<div className="relative text-gray-800 text-xl">
													Is shipping really free?
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className="relative text-gray-800 text-base pb-8 pt-4">
													Yes, we provide free
													standard shipping on all
													orders within the country.
												</div>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
							</div>
						</div>
						<div className="relative h-auto w-full">
							<div className="relative h-auto w-full flex-col space-y-16">
								<div className="relative w-full flex-col space-y-4">
									<div className="relative text-center text-gray-600 text-base">
										Testimonials
									</div>
									<div className="font-bold text-5xl text-center text-gray-800">
										Customer Reviews/Testimonials
									</div>
								</div>

								{/* Flexbox container for the reviews */}
								{/* Review 1 */}
								<div className="relative w-full flex gap-8 justify-center">
									{/* Short Reviews Grid */}
									<div className="w-full flex flex-col gap-8 max-w-md">
										{/* Review 1 */}
										<div className="w-full p-6 bg-white rounded-lg shadow-xl border">
											<div className="text-xl font-semibold text-gray-700">
												John Doe
											</div>
											<div className="text-gray-500 mt-2">
												FigPic has been an amazing
												shopping experience! The
												products are top-notch, and the
												delivery was incredibly fast.
												Highly recommend!
											</div>
										</div>

										{/* Review 2 */}
										<div className="w-full p-6 bg-white rounded-lg shadow-xl border">
											<div className="text-xl font-semibold text-gray-700">
												Alex Williams
											</div>
											<div className="text-gray-500 mt-2">
												Excellent service! The product
												arrived quickly and was exactly
												as described. Will definitely be
												back for more shopping!
											</div>
										</div>

										{/* Review 3 */}
										<div className="w-full p-6 bg-white rounded-lg shadow-xl border">
											<div className="text-xl font-semibold text-gray-700">
												Sophia Turner
											</div>
											<div className="text-gray-500 mt-2">
												Great shopping experience, I
												loved the ease of the website.
											</div>
										</div>
									</div>

									{/* Longer Reviews Grid */}
									<div className="w-full flex flex-col gap-8 max-w-md">
										{/* Review 4 (Longer review) */}
										<div className="w-full p-6 bg-white rounded-lg shadow-xl border">
											<div className="text-xl font-semibold text-gray-700">
												Jane Smith
											</div>
											<div className="text-gray-500 mt-2">
												Great variety of products, and
												the customer support was really
												helpful when I had a question
												about my order. They went above
												and beyond to ensure everything
												went smoothly. The website is
												easy to navigate, and checkout
												was simple. Will definitely shop
												again!
											</div>
										</div>

										{/* Review 5 (Longer review) */}
										<div className="w-full p-6 bg-white rounded-lg shadow-xl border">
											<div className="text-xl font-semibold text-gray-700">
												Michael Johnson
											</div>
											<div className="text-gray-500 mt-2">
												I had an amazing experience
												shopping with FigPic! From the
												user-friendly website to the
												fantastic customer service,
												everything was seamless. I
												ordered a couple of items, and
												they arrived ahead of schedule,
												exactly what I expected. Will be
												shopping here often from now on!
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="relative">
				<Footer />
			</div>
		</div>
	);
}
