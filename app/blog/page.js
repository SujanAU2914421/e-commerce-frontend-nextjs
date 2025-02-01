"use client";
import React from "react";
import Navbar from "../../components/landingPageNavbar";
import Footer from "@/components/footer";

export default function Blog() {
	return (
		<div className="relative h-screen w-screen overflow-y-auto overflow-x-hidden">
			<div className="sticky top-0 z-50 bg-transparent backdrop-blur flex justify-center h-16 w-full">
				<div className="relative h-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
					<Navbar />
				</div>
			</div>
			<div className="relative w-full flex justify-center h-auto">
				<div className="relative h-full xl:w-[80vw] lg:w-[80vw] md:w-[90vw] sm:w-[95vw]">
					<h1 className="text-4xl font-bold text-center my-8">
						Welcome to the FigPic Blog
					</h1>
					<p className="text-lg text-gray-600 text-center mb-8">
						Stay updated with the latest news, trends, and updates
						from FigPic. Explore our insightful articles about
						e-commerce, product highlights, and much more.
					</p>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="p-4 border rounded-xl shadow-md hover:shadow-lg">
							<h2 className="text-2xl font-semibold">
								5 Tips for Shopping Smarter on FigPic
							</h2>
							<p className="text-gray-500 mt-2">
								Discover how to make the most of your shopping
								experience with these expert tips.
							</p>
							<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
								Read More
							</button>
						</div>
						<div className="p-4 border rounded-xl shadow-md hover:shadow-lg">
							<h2 className="text-2xl font-semibold">
								Behind the Scenes: How FigPic Brings You the
								Best Products
							</h2>
							<p className="text-gray-500 mt-2">
								Get an exclusive look at our product sourcing
								and quality control process.
							</p>
							<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
								Read More
							</button>
						</div>
						<div className="p-4 border rounded-xl shadow-md hover:shadow-lg">
							<h2 className="text-2xl font-semibold">
								Upcoming Features to Look Forward To
							</h2>
							<p className="text-gray-500 mt-2">
								We're working hard to bring you exciting new
								features—here's a sneak peek!
							</p>
							<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
								Read More
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="relative h-auto">
				<Footer />
			</div>
		</div>
	);
}
