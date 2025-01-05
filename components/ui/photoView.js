import { X, XIcon } from "lucide-react/dist/cjs/lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PhotoView({
	photoView,
	setPhotoView,
	currentImageIndexInView,
	setCurrentImageIndexInView,
}) {
	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			setPhotoView(null);
		}
	};
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);

	return (
		<div className="fixed h-screen w-screen z-[9999] top-0 left-0 bg-black/40">
			<div className="relative h-full w-full py-4 flex justify-center">
				<div
					className="absolute h-full w-full top-0 left-0 group"
					onMouseMove={(e) => {
						setPosX(e.clientX);
						setPosY(e.clientY);
					}}
					onClick={() => {
						setPhotoView(null);
					}}
				>
					<div
						style={{
							left: posX - 15 + "px",
							top: posY - 15 + "px",
							height: 30,
							width: 30,
						}}
						className="absolute"
					>
						<div className="relative h-full w-full rounded-full bg-white/80 flex items-center justify-center group-hover:opacity-100 opacity-0 text-red-500 cursor-pointer">
							<XIcon size={20} stroke="currentColor" />
						</div>
					</div>
				</div>
				<div className="relative w-[40vw] h-full bg-white border">
					<div
						className="relative h-full w-auto"
						style={{
							background: `url(${photoView[currentImageIndexInView]}) center / cover`,
						}}
					>
						<Image
							src={photoView[currentImageIndexInView]}
							alt="nothing but a heart ache"
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<div className="absolute top-0 left-0 h-full w-full group flex items-center justify-between">
						<div
							className="absolute top-0 right-0 h-10 w-10 cursor-pointer flex items-center justify-center bg-white text-gray-700 z-20"
							onClick={() => setPhotoView(null)}
						>
							<X size={20} />
						</div>
						<div className="relative h-full w-full flex items-end justify-center pb-8">
							<div className="relative">
								<div className="relative flex items-center gap-4 flex-wrap">
									{photoView.map((image, index) => {
										return (
											<div
												key={index}
												className={`relative h-[4vw] w-[4vw] min-h-[50px] min-w-[50px] ${
													index === currentImageIndexInView
														? "scale-110 -translate-y-2"
														: "hover:scale-110 scale-100 translate-y-0"
												} duration-200 cursor-pointer`}
												onMouseMove={() => {
													setCurrentImageIndexInView(index);
												}}
											>
												<div
													className="relative h-full w-full opacity-0 group-hover:opacity-100 duration-200 translate-y-1 group-hover:translate-y-0 border-white border rounded shadow-xl"
													style={{ transitionDelay: `${index * 50}ms` }}
												>
													<Image
														alt="Thumbnail"
														src={image}
														layout="fill"
														objectFit="cover"
													/>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
