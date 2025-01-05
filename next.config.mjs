/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async rewrites() {
		return [
			{
				source: "/api/:path*", // This will match all API routes
				destination: "http://127.0.0.1:8000/api/:path*", // The URL of your Laravel API
			},
		];
	},
};

export default nextConfig;
