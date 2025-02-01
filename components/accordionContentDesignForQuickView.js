import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionContentDesignForQuickView({
	currentItemData,
}) {
	function decodeHtmlEntities(text) {
		const textArea = document.createElement("textarea");
		textArea.innerHTML = text;
		return textArea.value;
	}
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
											style={{ color: color.name }}
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
		</Accordion>
	);
}
