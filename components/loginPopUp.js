import Login from "@/app/auth/login/page";
import { useAuthContext } from "@/contexts/AuthContext";
import { XIcon } from "lucide-react";
import React from "react";

export default function LoginPopUp() {
	const { showLoginPopUp, setShowLoginPopUp } = useAuthContext();

	return (
		showLoginPopUp && (
			<div className="fixed h-screen w-screen top-0 left-0 z-40 bg-black/10 flex items-center justify-center group">
				<div
					className="absolute top-0 left-0 h-full w-full"
					onClick={() => {
						setShowLoginPopUp(false);
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
				<Login />
			</div>
		)
	);
}
