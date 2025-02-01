import {
	Facebook,
	Instagram,
	Link2,
	MessageCircleIcon,
} from "lucide-react/dist/cjs/lucide-react";
import React from "react";

export default function ShareUi() {
	return (
		<div className="relative flex flex-wrap items-center gap-4">
			<div
				className="relative text-sm text-gray-600 uppercase font-semibold"
				style={{ fontFamily: "afacad-flux" }}
			>
				Share
			</div>
			<div className="relative flex gap-2 flex-wrap *:h-8 *:w-8 *:rounded *:flex *:items-center *:justify-center *:text-gray-600">
				<div className="relative scale-100 hover:scale-105 duration-200 hover:text-black cursor-pointer">
					<Facebook size={18} />
				</div>
				<div className="relative scale-100 hover:scale-105 duration-200 hover:text-black cursor-pointer">
					<Instagram size={18} />
				</div>
				<div className="relative scale-100 hover:scale-105 duration-200 hover:text-black cursor-pointer">
					<svg
						width="16"
						height="16"
						version="1.1"
						viewBox="0 0 300 300.251"
						stroke="currentColor"
						fill="currentColor"
					>
						<path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
					</svg>
				</div>
				<div className="relative scale-100 hover:scale-105 duration-200 hover:text-black cursor-pointer">
					<MessageCircleIcon size={18} />
				</div>
				<div className="relative scale-100 hover:scale-105 duration-200 hover:text-black cursor-pointer">
					<Link2 size={18} />
				</div>
			</div>
		</div>
	);
}
