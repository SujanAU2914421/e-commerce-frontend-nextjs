import { useState } from "react";

// Skeleton component
const Skeleton = () => (
	<div className="absolute top-0 left-0 h-full w-full bg-gray-300 animate-pulse" />
);

// Image with Skeleton component
export const ImageWithSkeleton = ({ src }) => {
	const [loading, setLoading] = useState(true);

	return (
		<div className="relative w-full h-auto min-h-72">
			<Skeleton />
			<div className="relative h-auto w-full">
				<img
					src={`${src}`}
					alt="product image"
					onLoad={() => setLoading(false)}
					className="h-auto w-full z-10"
				/>
			</div>
		</div>
	);
};
