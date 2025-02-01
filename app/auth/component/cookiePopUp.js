import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react/dist/cjs/lucide-react";

export const CookieConsent = () => {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		// Check if the user has already accepted cookies
		const cookieConsent = Cookies.get("cookie_consent");

		if (!cookieConsent) {
			setShowBanner(true); // Show the consent banner if no consent is given
		}
	}, []);

	const handleAcceptCookies = () => {
		// Set a cookie to remember the user's consent
		Cookies.set("cookie_consent", "accepted", {
			expires: 365,
			SameSite: "None",
			Secure: true,
		});

		// Close the banner
		setShowBanner(false);

		// Optionally, you can save your other cookies here
		Cookies.set("cookie_key", "cookie_value", {
			expires: 7,
			SameSite: "None",
			Secure: true,
		});
	};

	const handleDeclineCookies = () => {
		// Optionally, handle the case where the user declines cookies
		Cookies.set("cookie_consent", "declined", {
			expires: 365,
			SameSite: "None",
			Secure: true,
		});
		setShowBanner(false);
	};

	return (
		showBanner && (
			<div className="fixed z-50 w-[350px] right-16 bottom-16 flex justify-center bg-indigo-600 text-gray-200 px-16 py-8 rounded-md">
				<div className="relative grid gap-4">
					<div className="relative text-center">
						We use cookies to improve your experience on our site. By accepting, you agree to our use of cookies.
					</div>
					<div className="relative flex items-center justify-center gap-4">
						<Button
							className="relative text-black bg-white"
							variant="default"
							size="default"
							onClick={handleAcceptCookies}
						>
							Accept
							<Check size={14} />
						</Button>
						<Button
							className="relative text-black bg-white"
							variant="default"
							size="default"
							onClick={handleDeclineCookies}
						>
							Decline
							<X size={14} />
						</Button>
					</div>
				</div>
			</div>
		)
	);
};
