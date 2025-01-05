"use client";

import axios from "@/config/axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// To prevent the checkAuthenticated function from running multiple times
	const operationExecuted = useRef(false);
	const [path, setPath] = useState("");

	const getPathname = () => {
		return window.location.pathname;
	};

	const checkAuth = async () => {
		try {
			const response = await axios.post("check-auth");

			if (response.user) {
				setIsAuthenticated(true);
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
		setPath(getPathname());
		if (!operationExecuted.current) {
			checkAuth();
		}
		return () => {
			operationExecuted.current = false;
		};
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuthContext = () => {
	if (!AuthContext) {
		throw new Error(
			"useAuthContext must be used within an AuthContextProvider"
		);
	}
	return useContext(AuthContext);
};
