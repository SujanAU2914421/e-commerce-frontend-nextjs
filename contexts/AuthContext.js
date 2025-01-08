"use client";

import axios from "@/config/axios";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	// To prevent the checkAuthenticated function from running multiple times
	const operationExecuted = useRef(false);
	const path = usePathname();

	const checkAuth = async () => {
		try {
			const response = await axios.post("check-auth");

			setUser(response.user);
			if (response.user) {
				if (path === "/auth/login" || path === "/auth/signup") {
					window.location.href = "/";
				}
			}
		} catch (error) {}
	};

	const login = (token) => {
		// Set a new token
		Cookies.set("auth_token", token, {
			secure: true,
			sameSite: "Strict",
			expires: 7, // New expiration time
		});
		if (path == "/auth/login" || path == "/auth/signup") {
			window.location.href = "/";
		}
	};

	const logout = async () => {
		const response = await axios.get("logout");
		console.log(response);
	};

	useEffect(() => {
		if (!operationExecuted.current) {
			checkAuth();
		}
		return () => {
			operationExecuted.current = false;
		};
	}, []);

	return <AuthContext.Provider value={{ login, logout, user }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
	if (!AuthContext) {
		throw new Error("useAuthContext must be used within an AuthContextProvider");
	}
	return useContext(AuthContext);
};
