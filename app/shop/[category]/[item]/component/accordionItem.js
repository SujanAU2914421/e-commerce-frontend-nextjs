import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AllReview from "@/components/ui/allReview";
import RatingsStar from "@/components/ui/ratingsStar";

export default function AccordionContentDesign({
	currentColor,
	setCurrentColor,
	currentItemData,
}) {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="discription">
				<AccordionTrigger className="relative font-extrabold text-gray-800">
					Detailed Discription
				</AccordionTrigger>
				<AccordionContent className="relative text-gray-700 text-[1rem]">
					Crafted from a soft and breathable cotton-blend fabric, this hoodie
					keeps you feeling comfortable and cool no matter how intense your
					workout gets. The flames surrounding Goku symbolize the raw energy
					that fuels every gym session, reminding you that like Goku, you’re
					always evolving and growing stronger. 🔥💪 With an adjustable hood,
					front pocket, and a bold design, this hoodie brings anime energy and
					gym vibes into one stylish, functional piece. Whether you’re training
					hard, chilling with friends, or showing off your strength, this hoodie
					will empower you to take on anything.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="information">
				<AccordionTrigger className="relative font-extrabold text-gray-800">
					Information
				</AccordionTrigger>
				<AccordionContent className="relative text-gray-700">
					<div className="relative h-auto w-full grid gap-5 pt-4 text-[1rem] *:grid *:gap-2">
						<div className="relative">
							<div className="relative font-bold">Shipping</div>
							<div className="relative text-gray-700">
								We currently offer free shipping above Rs.1299 PAN Nepal
							</div>
						</div>
						<div className="relative">
							<div className="relative font-bold">Return & exchange</div>
							<div className="relative text-gray-700">
								If you are not satisfied with your purchase you can return it to
								us within 14 days for an exchange or refund.
							</div>
						</div>
						<div className="relative">
							<div className="relative font-bold">Assistance</div>
							<div className="relative text-gray-700">
								Contact us on (+977) 9815061114 , or email us at
								deecoodeer@gmail.com.
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="additionalInformation">
				<AccordionTrigger className="relative font-extrabold text-gray-800">
					Additional Information
				</AccordionTrigger>
				<AccordionContent className="relative text-gray-700">
					<div className="relative h-auto w-full grid gap-5 pt-4 text-[1rem]">
						<div className="relative w-full flex items-center justify-between">
							<div className="relative font-bold">Color</div>
							<div className="relative text-gray-700 flex max-w-[calc(100%-6rem)] flex-wrap gap-2">
								{currentItemData.colors?.map((color, index) => {
									return (
										<div key={index} style={{ color: color.name }}>
											{color.name}
										</div>
									);
								})}
							</div>
						</div>
						<div className="relative w-full flex items-center justify-between">
							<div className="relative font-bold">Size</div>
							<div className="relative text-gray-700 flex max-w-[calc(100%-6rem)] flex-wrap gap-2">
								{currentItemData.sizes?.map((size, index) => {
									return (
										<div key={index}>
											{size} {size.length >= index && ","}
										</div>
									);
								})}
							</div>
						</div>
						<div className="relative w-full flex items-center justify-between">
							<div className="relative font-bold">Material</div>
							<div className="relative text-gray-700">Cotton</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="review">
				<AccordionTrigger className="relative font-bold text-gray-800">
					<div className="relative flex w-full justify-between items-center pr-4">
						<div className="relative flex">
							<div className="relative">
								Reviews(
								<span className="relative font-sans">
									{currentItemData.reviews.length}
								</span>
								)
							</div>
						</div>
						<div className="relative">
							<div className="relative flex gap-3 items-center">
								{/* Render stars based on the rating */}
								<RatingsStar currentProduct={currentItemData} size={10} />
							</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className="relative text-gray-700">
					<AllReview currentItemData={currentItemData} />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
