import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

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
			<div style={styles.banner}>
				<p>
					We use cookies to improve your experience on our site. By accepting,
					you agree to our use of cookies.
				</p>
				<button onClick={handleAcceptCookies}>Accept</button>
				<button onClick={handleDeclineCookies}>Decline</button>
			</div>
		)
	);
};

// Styles for the cookie consent banner
const styles = {
	banner: {
		position: "fixed",
		bottom: "0",
		left: "0",
		right: "0",
		backgroundColor: "#333",
		color: "white",
		padding: "10px",
		textAlign: "center",
		zIndex: "1000",
	},
};
