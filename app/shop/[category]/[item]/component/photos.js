import { ZoomIn } from "lucide-react/dist/cjs/lucide-react";
import React, { useEffect, useState } from "react";

export default function PhotosUi({ photos, setPhotoView, setCurrentImageIndexInView }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleImageClick = (index) => {
		setCurrentImageIndex(index);
	};

	const shopPhotoPopUp = () => {
		setCurrentImageIndexInView(currentImageIndex);
		setPhotoView(photos?.images);
	};

	return (
		<div className="relative h-full w-full">
			<div className="xl:sticky lg:sticky md:sticky relative xl:top-16 lg:top-16 md:top-16 top-0 w-full h-auto flex xl:flex-nowrap lg:flex-nowrap md:flex-nowrap flex-wrap-reverse gap-4">
				<div className="relative xl:h-auto lg:h-auto h-auto lg:w-[6vw] md:w-[6vw] w-full">
					<div className="relative xl:w-[6vw] lg:w-[6vw] gap-4 flex xl:flex-col lg:flex-col md:flex-col flex-row flex-wrap">
						{photos["images"]?.map((image, index) => {
							return (
								<div
									key={index}
									className="relative xl:h-[6vw] lg:h-[6vw] md:h-[6vw] h-[16vw] xl:w-full lg:w-full bg-gray-200 md:w-full w-[16vw] hover:scale-105 scale-100 duration-200 cursor-pointer rounded overflow-hidden"
									onMouseMove={() => {
										handleImageClick(index);
									}}
								>
									<div
										className={`relative h-full w-full`}
										style={{
											background: `url(${image}) center / contain no-repeat`,
										}}
									></div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="relative h-auto xl:w-[calc(100%-6vw)] lg:w-[calc(100%-6vw)] md::w-[calc(100%-6vw)] w-full group">
					<div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-gray-600 text-xs">
						Loading...
					</div>
					<div
						onClick={() => {
							shopPhotoPopUp();
						}}
						className="relative xl:h-[calc(100vh-8rem)] lg:h-[calc(100vh-8rem)] md:h-[calc(100vh-8rem)] h-[90vw] w-full overflow-hidden flex justify-center"
					>
						<div
							className="absolute top-4 right-4 h-10 w-10 bg-white z-10 flex items-center cursor-pointer justify-center rounded-md group-hover:opacity-100 opacity-0 duration-200 text-gray-700"
							onClick={() => {
								shopPhotoPopUp();
							}}
						>
							<ZoomIn size={20} />
						</div>
						<div
							className="relative h-full w-full rounded"
							style={{
								background: `url(${photos?.images[currentImageIndex]}) center / contain no-repeat`,
							}}
							onMouseMove={(e) => {
								const rect = e.currentTarget.getBoundingClientRect();
								const x = ((e.clientX - rect.left) / rect.width) * 100; // X-coordinate as a percentage
								const y = ((e.clientY - rect.top) / rect.height) * 100; // Y-coordinate as a percentage
								e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
								e.currentTarget.style.backgroundSize = "200%"; // Zoom effect
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundPosition = "center";
								e.currentTarget.style.backgroundSize = "contain"; // Reset zoom
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
}
