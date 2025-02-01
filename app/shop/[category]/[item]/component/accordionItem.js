import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AllReview from "@/components/allReview";
import { useUserInterractionContext } from "@/contexts/UserInterractionContext";
import { fetchAllComments } from "@/lib/reviewHandle";
import RatingsStar from "@/components/ratingsStar";
import tinycolor from "tinycolor2";

export default function AccordionContentDesign({
	currentColor,
	setCurrentColor,
	currentItemData,
}) {
	const { comments, setComments } = useUserInterractionContext();

	useEffect(() => {
		if (currentItemData) {
			fetchAllComments(currentItemData.id, setComments);
		}
	}, [currentItemData, setComments]);

	function decodeHtmlEntities(text) {
		const textArea = document.createElement("textarea");
		textArea.innerHTML = text;
		return textArea.value;
	}
	const getContrastBackground = (color) => {
		const tc = tinycolor(color);
		return tc.isLight()
			? tc.darken(20).toString()
			: tc.lighten(40).toString();
	};

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="discription">
				<AccordionTrigger className="relative font-extrabold text-gray-800">
					Detailed Discription
				</AccordionTrigger>
				<AccordionContent className="relative text-gray-700 text-[1rem]">
					<div
						className="relative"
						dangerouslySetInnerHTML={{
							__html: decodeHtmlEntities(
								currentItemData.detailed_description
							),
						}}
					></div>
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
								We currently offer free shipping above Rs.1299
								PAN Nepal
							</div>
						</div>
						<div className="relative">
							<div className="relative font-bold">
								Return & exchange
							</div>
							<div className="relative text-gray-700">
								If you are not satisfied with your purchase you
								can return it to us within 14 days for an
								exchange or refund.
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
										<div
											key={index}
											style={{
												backgroundColor: color.name,
												color: getContrastBackground(
													color.name
												),
											}}
											className="relative py-1 px-3 rounded-md text-sm font-bold border"
										>
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
									{comments.length}
								</span>
								)
							</div>
						</div>
						<div className="relative">
							<div className="relative flex gap-3 items-center">
								{/* Render stars based on the rating */}
								<RatingsStar
									currentProduct={comments}
									size={10}
								/>
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
